import { NextRequest } from 'next/server';
import { successResponse, errorResponse, validateRequired, validateEmail } from '@/lib/api';
import { hashPassword } from '@/lib/crypto';
import { signToken } from '@/lib/auth';

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

    const hashedPassword = await hashPassword(password);

    const user = {
      id: `user_${Date.now()}`,
      email,
      name,
      avatar: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      subscriptionTier: 'free' as const,
      interviewCount: 0,
      totalXP: 0,
      streakDays: 0,
    };

    const token = await signToken({ userId: user.id, email: user.email });

    return successResponse(
      {
        user,
        token,
      },
      'Signup successful',
      201
    );
  } catch (error) {
    console.error('Signup error:', error);
    return errorResponse('SIGNUP_ERROR', 'Failed to create account', 500);
  }
}
