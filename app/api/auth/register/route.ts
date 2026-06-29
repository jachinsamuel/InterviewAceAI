import { NextRequest } from 'next/server';
import { successResponse, errorResponse, validateRequired, validateEmail } from '@/lib/api';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, confirmPassword } = body;

    const validation = validateRequired(body, ['name', 'email', 'password', 'confirmPassword']);
    if (!validation.valid) {
      return errorResponse('VALIDATION_ERROR', validation.error);
    }

    if (!validateEmail(email)) {
      return errorResponse('INVALID_EMAIL', 'Invalid email format');
    }

    if (password !== confirmPassword) {
      return errorResponse('PASSWORD_MISMATCH', 'Passwords do not match');
    }

    if (password.length < 8) {
      return errorResponse('WEAK_PASSWORD', 'Password must be at least 8 characters');
    }

    if (!prisma) {
      return errorResponse('DB_ERROR', 'Database client not available', 503);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse('USER_EXISTS', 'A user with this email already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.$transaction(async (tx) => {
      const u = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          progress: {
            create: { totalInterviews: 0, averageScore: 0, longestStreak: 0, currentStreak: 0, totalXP: 0 },
          },
        },
      });
      return u;
    });

    return successResponse(
      { user: { id: newUser.id, email: newUser.email, name: newUser.name } },
      'Registration successful',
      201
    );
  } catch (error) {
    console.error('Registration error:', error);
    return errorResponse('SIGNUP_ERROR', 'Failed to create account', 500);
  }
}
