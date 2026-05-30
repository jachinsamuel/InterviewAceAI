export const APP_NAME = 'InterviewAce AI';
export const APP_DESCRIPTION = 'Master every interview with AI-powered preparation';

export const COLORS = {
  primary: '#D94F00',
  secondary: '#FFFFFF',
  accent: '#F5F5F5',
  darkBg: '#0F0F0F',
  darkBg2: '#1A1A1A',
  lightBg: '#FFFFFF',
  lightText: '#FFFFFF',
  darkText: '#1A1A1A',
  gray: '#6B7280',
  lightGray: '#F3F4F6',
};

export const TYPOGRAPHY = {
  heading: 'font-bold text-5xl leading-tight',
  subheading: 'font-semibold text-2xl leading-relaxed',
  body: 'font-regular text-base leading-normal',
  caption: 'font-regular text-sm leading-tight',
  code: 'font-mono text-sm',
};

export const INTERVIEW_MODES = {
  TECHNICAL: 'technical',
  HR: 'hr',
  CODING: 'coding',
  BEHAVIORAL: 'behavioral',
};

export const FEATURES = [
  {
    id: 1,
    title: 'AI Technical Interviews',
    description: 'Practice DSA, system design, and technical concepts with adaptive AI',
    icon: 'Cpu',
  },
  {
    id: 2,
    title: 'Voice-Based Mock Interviews',
    description: 'Real-time speech recognition and pronunciation analysis',
    icon: 'Mic',
  },
  {
    id: 3,
    title: 'Coding Interview Simulator',
    description: 'Monaco editor with live code execution and test cases',
    icon: 'Code',
  },
  {
    id: 4,
    title: 'NLP Communication Analysis',
    description: 'Analyze grammar, vocabulary, filler words, and confidence',
    icon: 'BarChart3',
  },
  {
    id: 5,
    title: 'Real-Time Feedback',
    description: 'Get instant feedback on your answers and performance',
    icon: 'MessageCircle',
  },
  {
    id: 6,
    title: 'Resume-Based Interviews',
    description: 'AI generates questions tailored to your resume',
    icon: 'FileText',
  },
  {
    id: 7,
    title: 'Company-Specific Prep',
    description: 'Practice with interview sets from top tech companies',
    icon: 'Building2',
  },
  {
    id: 8,
    title: 'Performance Analytics',
    description: 'Track progress with detailed scorecards and insights',
    icon: 'TrendingUp',
  },
  {
    id: 9,
    title: 'AI Career Coach',
    description: 'Personalized career guidance and interview tips',
    icon: 'Users',
  },
  {
    id: 10,
    title: 'Gamified Learning',
    description: 'Earn XP, streaks, achievements, and climb leaderboards',
    icon: 'Trophy',
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Upload Your Resume',
    description: 'Start by uploading your resume for AI analysis',
  },
  {
    step: 2,
    title: 'Choose Role & Skills',
    description: 'Select your target role and the skills you want to practice',
  },
  {
    step: 3,
    title: 'AI Conducts Interview',
    description: 'Realistic AI interviewer asks adaptive questions',
  },
  {
    step: 4,
    title: 'Answer via Voice or Text',
    description: 'Respond naturally as you would in a real interview',
  },
  {
    step: 5,
    title: 'Receive Detailed Feedback',
    description: 'Get comprehensive analysis on your performance',
  },
  {
    step: 6,
    title: 'Improve and Retry',
    description: 'Practice again with improved difficulty and questions',
  },
];

export const PRICING_TIERS = [
  {
    id: 'free',
    name: 'Starter',
    price: 0,
    period: 'Forever',
    description: 'Perfect for getting started',
    features: [
      '5 free interviews/month',
      'Basic AI feedback',
      'Limited skill categories',
      'Community leaderboard',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 29,
    period: '/month',
    description: 'For serious job seekers',
    features: [
      'Unlimited interviews',
      'Advanced AI feedback with NLP analysis',
      'All skill categories unlocked',
      'Company-specific interview sets',
      'Resume analyzer & ATS checker',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    period: 'Custom',
    description: 'For organizations',
    features: [
      'Everything in Professional',
      'Team management & analytics',
      'Custom interview templates',
      'Dedicated support',
      'SSO & advanced security',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];
