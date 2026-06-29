import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return errorResponse('UNAUTHORIZED', 'You must be logged in to create an interview', 401);
    }

    const user = await prisma?.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return errorResponse('USER_NOT_FOUND', 'User not found', 404);
    }

    const { type, title, company, role } = await req.json();

    if (!type || !title) {
      return errorResponse('VALIDATION_ERROR', 'Missing required fields: type, title');
    }

    const interview = await prisma?.interview.create({
      data: {
        userId: user.id,
        type,
        title,
        company,
        role,
        duration: 0,
      },
    });

    return successResponse({ interview }, 'Interview created successfully', 201);
  } catch (error) {
    console.error('Failed to create interview:', error);
    return errorResponse('INTERNAL_SERVER_ERROR', 'Failed to create interview', 500);
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return errorResponse('UNAUTHORIZED', 'You must be logged in to view interviews', 401);
    }

    const user = await prisma?.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return errorResponse('USER_NOT_FOUND', 'User not found', 404);
    }

    const interviews = await prisma?.interview.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: { feedback: true }
    });

    return successResponse({ interviews });
  } catch (error) {
    console.error('Failed to fetch interviews:', error);
    return errorResponse('INTERNAL_SERVER_ERROR', 'Failed to fetch interviews', 500);
  }
}
