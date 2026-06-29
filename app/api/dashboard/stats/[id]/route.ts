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
      return errorResponse('UNAUTHORIZED', 'You must be logged in to view stats', 401);
    }

    const user = await prisma?.user.findUnique({
      where: { id },
      include: {
        progress: true,
        interviews: {
          orderBy: { startedAt: 'desc' },
          take: 5,
        }
      }
    });

    if (!user) {
      return errorResponse('USER_NOT_FOUND', 'User not found', 404);
    }

    const stats = {
      totalInterviews: user.progress?.totalInterviews ?? user.interviews.length,
      averageScore: user.progress?.averageScore ?? 0,
      currentStreak: user.progress?.currentStreak ?? 0,
      totalXP: user.progress?.totalXP ?? 0,
      recentInterviews: user.interviews.map(i => ({
        id: i.id,
        title: i.title,
        company: i.company,
        score: i.score,
        startedAt: i.startedAt,
      })),
      skillWisePerformance: [
        { skill: 'System Design', level: 2, progress: 45 },
        { skill: 'Communication', level: 3, progress: 80 },
        { skill: 'Problem Solving', level: 2, progress: 65 },
      ]
    };

    return successResponse({ stats });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return errorResponse('INTERNAL_SERVER_ERROR', 'Failed to fetch stats', 500);
  }
}
