import { NextRequest } from 'next/server';
import { generateInterviewQuestion } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role, skills, difficulty } = body;
    const result = await generateInterviewQuestion({ role, skills, difficulty });
    return new Response(JSON.stringify({ success: true, question: result.question }), { status: 200 });
  } catch (error) {
    console.error('AI generate error', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to generate question' }), { status: 500 });
  }
}
