import { NextRequest } from 'next/server';
import { successResponse, errorResponse, validateRequired, validateEmail } from '@/lib/api';
import { comparePasswords } from '@/lib/crypto';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const validation = validateRequired(body, ['email', 'password']);
    if (!validation.valid) {
      return errorResponse('VALIDATION_ERROR', validation.error);
    }

    if (!validateEmail(email)) {
      return errorResponse('INVALID_EMAIL', 'Invalid email format');
    }

    // Mock user lookup - in real app, query database
    // const user = await prisma.user.findUnique({ where: { email } });
    // if (!user || !await comparePasswords(password, user.password)) {
    //   return errorResponse('INVALID_CREDENTIALS', 'Invalid email or password');
    // }

    const user = {
      id: `user_${Date.now()}`,
      email,
      name: 'Test User',
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
      'Login successful'
    );
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('LOGIN_ERROR', 'Failed to login', 500);
  }
}
