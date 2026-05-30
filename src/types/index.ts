export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  subscriptionTier: 'free' | 'starter' | 'professional' | 'enterprise';
  interviewCount: number;
  totalXP: number;
  streakDays: number;
}

export interface Interview {
  id: string;
  userId: string;
  type: 'technical' | 'hr' | 'coding' | 'behavioral';
  title: string;
  company?: string;
  role?: string;
  startedAt: Date;
  completedAt?: Date;
  duration: number;
  score: number;
  technicalScore?: number;
  hrScore?: number;
  communicationScore?: number;
  questions: InterviewQuestion[];
  feedback: InterviewFeedback;
}

export interface InterviewQuestion {
  id: string;
  interviewId: string;
  question: string;
  questionType: 'open_ended' | 'coding' | 'multiple_choice';
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  followUpQuestion?: string;
  askedAt: Date;
  answeredAt?: Date;
}

export interface InterviewResponse {
  id: string;
  questionId: string;
  userId: string;
  responseText?: string;
  responseAudio?: string;
  responseCode?: string;
  duration: number;
  submittedAt: Date;
  feedback: ResponseFeedback;
}

export interface ResponseFeedback {
  id: string;
  responseId: string;
  accuracy: number;
  clarity: number;
  completeness: number;
  technicalCorrectness?: number;
  communicationScore?: number;
  confidenceScore: number;
  detailedFeedback: string;
  suggestions: string[];
  incorrectParts?: string[];
  improvements?: string[];
}

export interface InterviewFeedback {
  id: string;
  interviewId: string;
  overallScore: number;
  summaryFeedback: string;
  strengths: string[];
  areasOfImprovement: string[];
  nextSteps: string[];
  timeManagement: number;
  depthOfAnswers: number;
  followUpQualityScore: number;
}

export interface NLPAnalysis {
  grammarScore: number;
  vocabularyScore: number;
  fillerWordCount: number;
  speakingSpeed: 'slow' | 'normal' | 'fast';
  pauseFrequency: number;
  sentimentScore: 'positive' | 'neutral' | 'negative';
  confidenceScore: number;
  pronunciationScore: number;
  communicationEffectiveness: number;
}

export interface CodingProblem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  testCases: TestCase[];
  hints: string[];
  optimalSolution?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface UserProgress {
  id: string;
  userId: string;
  totalInterviews: number;
  averageScore: number;
  longestStreak: number;
  currentStreak: number;
  totalXP: number;
  skillProgress: SkillProgress[];
  completedChallenges: number;
  achievements: Achievement[];
}

export interface SkillProgress {
  skill: string;
  level: number;
  progress: number;
  interviewCount: number;
  averageScore: number;
}

export interface Achievement {
  id: string;
  userId: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Subscription {
  id: string;
  userId: string;
  tier: 'free' | 'starter' | 'professional' | 'enterprise';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  autoRenew: boolean;
}

export interface DashboardStats {
  totalInterviews: number;
  averageScore: number;
  currentStreak: number;
  totalXP: number;
  technicalScore: number;
  hrScore: number;
  communicationScore: number;
  weeklyProgress: DailyProgress[];
  recentInterviews: Interview[];
  skillWisePerformance: SkillProgress[];
  achievements: Achievement[];
}

export interface DailyProgress {
  date: string;
  interviewCount: number;
  averageScore: number;
  xpEarned: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}
