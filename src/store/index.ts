import { create } from 'zustand';
import { Interview, DashboardStats } from '@/types';

// Auth is now managed by NextAuth

interface InterviewStore {
  currentInterview: Interview | null;
  isRecording: boolean;
  startInterview: (type: 'technical' | 'hr' | 'coding' | 'behavioral', title: string) => Promise<void>;
  endInterview: () => void;
  setRecording: (recording: boolean) => void;
}

interface DashboardStore {
  stats: DashboardStats | null;
  isLoading: boolean;
  loadStats: (userId: string) => Promise<void>;
  setStats: (stats: DashboardStats) => void;
}

export const useInterviewStore = create<InterviewStore>((set) => ({
  currentInterview: null,
  isRecording: false,
  startInterview: async (type, title) => {
    try {
      const res = await fetch('/api/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, title, company: 'General', role: 'Software Engineer' }),
      });
      const data = await res.json();
      if (data.success && data.data.interview) {
        set({ currentInterview: data.data.interview as Interview });
      }
    } catch (error) {
      console.error('Failed to start interview', error);
    }
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
      if (data.success && data.data?.stats) {
        set({ stats: data.data.stats });
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  setStats: (stats) => set({ stats }),
}));
