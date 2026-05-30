import { create } from 'zustand';
import { User, Interview, DashboardStats } from '@/types';

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

interface InterviewStore {
  currentInterview: Interview | null;
  isRecording: boolean;
  startInterview: (type: string) => void;
  endInterview: () => void;
  setRecording: (recording: boolean) => void;
}

interface DashboardStore {
  stats: DashboardStats | null;
  isLoading: boolean;
  loadStats: (userId: string) => Promise<void>;
  setStats: (stats: DashboardStats) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.user) {
        set({ user: data.user, isLoggedIn: true });
        localStorage.setItem('token', data.token);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => {
    set({ user: null, isLoggedIn: false });
    localStorage.removeItem('token');
  },
  setUser: (user) => set({ user, isLoggedIn: !!user }),
}));

export const useInterviewStore = create<InterviewStore>((set) => ({
  currentInterview: null,
  isRecording: false,
  startInterview: (type) => {
    set({
      currentInterview: {
        id: `interview-${Date.now()}`,
        userId: '',
        type: type as any,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Interview`,
        duration: 0,
        score: 0,
        startedAt: new Date(),
        questions: [],
        feedback: {
          id: '',
          interviewId: '',
          overallScore: 0,
          summaryFeedback: '',
          strengths: [],
          areasOfImprovement: [],
          nextSteps: [],
          timeManagement: 0,
          depthOfAnswers: 0,
          followUpQualityScore: 0,
        },
      } as Interview,
    });
  },
  endInterview: () => set({ currentInterview: null, isRecording: false }),
  setRecording: (recording) => set({ isRecording: recording }),
}));

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: null,
  isLoading: false,
  loadStats: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`/api/dashboard/stats/${userId}`);
      const data = await res.json();
      if (data.stats) {
        set({ stats: data.stats });
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  setStats: (stats) => set({ stats }),
}));
