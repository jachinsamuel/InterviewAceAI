import OpenAI from 'openai';

const OPENAI_KEY = process.env.OPENAI_API_KEY;
let openai: OpenAI | null = null;
if (OPENAI_KEY) openai = new OpenAI({ apiKey: OPENAI_KEY });

export async function generateInterviewQuestion({ role, skills, difficulty }:
  { role?: string; skills?: string[]; difficulty?: 'easy'|'medium'|'hard'; context?: string }) {
  // Use OpenAI if available, otherwise return a deterministic template
  if (openai) {
    const prompt = `You are an expert interviewer. Generate one ${difficulty || 'medium'} interview question for the role: ${role || 'general'}; skills: ${skills?.join(', ') || 'general'}. Provide a short description of what a strong answer includes.`;
    const resp = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [{ role: 'system', content: 'You are an expert interviewer.' }, { role: 'user', content: prompt }],
      max_tokens: 400,
      temperature: 0.3,
    });
    const text = Array.isArray(resp.choices) && resp.choices[0]?.message?.content ? resp.choices[0].message.content : String(resp);
    return { question: text };
  }

  // Fallback: deterministic templated question
  const skillPart = skills && skills.length ? ` focusing on ${skills.join(', ')}` : '';
  const q = difficulty === 'hard' ?
    `Design a scalable system for a large-scale ${role || 'web'} application${skillPart}. Explain your design choices, trade-offs, and scalability considerations.` :
    difficulty === 'easy' ?
    `Explain what ${skills?.[0] || 'a basic concept'} is and give an example.` :
    `Describe how you would approach a ${role || 'generic'} task${skillPart}, including edge cases and complexity considerations.`;

  return { question: q };
}

export async function analyzeResponse({ text, transcript }:{ text?: string; transcript?: string }) {
  // If OpenAI present, use it to analyze; otherwise return heuristic analysis
  const source = text || transcript || '';
  if (!source) return { success: false, message: 'No response provided' };

  if (openai) {
    const prompt = `You are an interview coach. Given the candidate answer below, provide scores (0-100) for: correctness, clarity, completeness, communication. Then provide bullet list feedback and 3 concise improvement steps. Answer in JSON format.`;
    const resp = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert interview evaluator.' },
        { role: 'user', content: `${prompt}\n\n${source}` }
      ],
      temperature: 0.2,
      max_tokens: 600,
    });

    const content = resp.choices?.[0]?.message?.content || '';
    // Try to parse JSON from the model output
    try {
      const jsonStart = content.indexOf('{');
      const json = jsonStart >= 0 ? content.slice(jsonStart) : content;
      const parsed = JSON.parse(json);
      return { success: true, analysis: parsed };
    } catch {
      return { success: true, analysis: { raw: content } };
    }
  }

  // Heuristic fallback
  const words = source.split(/\s+/).filter(Boolean).length;
  const fillerMatches = (source.match(/\b(um|uh|like|you know)\b/gi) || []).length;
  const speakingSpeed = words < 50 ? 'slow' : words < 150 ? 'normal' : 'fast';
  const analysis = {
    correctness: 70,
    clarity: 80 - fillerMatches * 5,
    completeness: Math.min(85, 50 + Math.floor(words / 10)),
    communication: 75 - fillerMatches * 5,
    fillerWordCount: fillerMatches,
    speakingSpeed,
    suggestions: [
      'Reduce filler words; pause briefly before answering.',
      'Structure answers: Situation, Task, Action, Result.',
      'Provide specific examples and quantify impact when possible.'
    ]
  };

  return { success: true, analysis };
}
