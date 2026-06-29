import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session?.user?.email) {
      return errorResponse('UNAUTHORIZED', 'You must be logged in to view an interview', 401);
    }

    const user = await prisma?.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return errorResponse('USER_NOT_FOUND', 'User not found', 404);
    }

    const interview = await prisma?.interview.findFirst({
      where: { id, userId: user.id },
      include: {
        questions: true,
        feedback: true,
      }
    });

    if (!interview) {
      return errorResponse('NOT_FOUND', 'Interview not found', 404);
    }

    return successResponse({ interview });
  } catch (error) {
    console.error('Failed to fetch interview:', error);
    return errorResponse('INTERNAL_SERVER_ERROR', 'Failed to fetch interview', 500);
  }
}
