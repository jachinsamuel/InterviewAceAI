'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { motion } from 'framer-motion';
import { Flame, Zap, BarChart3, BookOpen } from 'lucide-react';
import { Button, LoadingSpinner } from '@/components/common/Button';
import { useDashboardStore } from '@/store';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const authLoading = status === 'loading';
  const isLoggedIn = status === 'authenticated';
  const user = session?.user;
  const { stats, isLoading: statsLoading, loadStats } = useDashboardStore();

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push('/auth/login');
    }
  }, [isLoggedIn, authLoading, router]);

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      loadStats(user.id);
    }
  }, [isLoggedIn, user?.id, loadStats]);

  if (authLoading || !isLoggedIn) {
    return (
      <main className="min-h-screen bg-dark-bg flex flex-col justify-between">
        <Header />
        <div className="flex items-center justify-center flex-1">
          <LoadingSpinner size="lg" />
        </div>
        <Footer />
      </main>
    );
  }

  const statCards = [
    {
      title: 'Total Interviews',
      value: stats?.totalInterviews ?? 0,
      icon: BookOpen,
      change: 'Complete more sessions to practice',
    },
    {
      title: 'Average Score',
      value: `${stats?.averageScore ?? 0}%`,
      icon: BarChart3,
      change: 'Strive for 85% or higher',
    },
    {
      title: 'Current Streak',
      value: `${stats?.currentStreak ?? 0} days`,
      icon: Flame,
      change: 'Keep up your daily practice!',
    },
    {
      title: 'Total XP',
      value: (stats?.totalXP ?? 0).toLocaleString(),
      icon: Zap,
      change: 'XP helps you level up',
    },
  ];

  const recentInterviews = stats?.recentInterviews ?? [];
  const skillProgressList = stats?.skillWisePerformance ?? [
    { skill: 'System Design', level: 1, progress: 20 },
    { skill: 'Communication', level: 1, progress: 40 },
    { skill: 'Problem Solving', level: 1, progress: 60 },
  ];

  return (
    <main className="min-h-screen bg-dark-bg">
      <Header />

      <div className="container-max py-16">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl font-black mb-3 text-light-text">
            Welcome back, <span className="gradient-text">{user?.name ?? 'User'}</span>
          </h1>
          <p className="text-lg text-light-text/70">Continue mastering your interview skills</p>
        </motion.div>

        {statsLoading ? (
          <div className="flex items-center justify-center py-24">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {/* Stat Cards Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-8 rounded-2xl border border-primary/10 bg-dark-bg-2 hover:border-primary/30 transition-all duration-300">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <p className="text-light-text/70 text-sm font-medium mb-2">{stat.title}</p>
                          <p className="text-4xl font-black text-light-text">{stat.value}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/20 transition-all">
                          <Icon size={24} className="text-primary group-hover:text-secondary transition-colors" />
                        </div>
                      </div>
                      <p className="text-sm text-light-text/60">{stat.change}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Interviews */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-light-text">Recent Interviews</h2>
                </div>

                {recentInterviews.length === 0 ? (
                  <div className="p-12 rounded-2xl border border-primary/10 bg-dark-bg-2/50 text-center">
                    <p className="text-light-text/70 mb-6 text-lg">No mock interviews yet. Start your first one!</p>
                    <Link href="/interview">
                      <Button size="lg" variant="primary">
                        Take Your First Interview
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentInterviews.map((interview, index) => (
                      <motion.div
                        key={interview.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-xl border border-primary/10 bg-dark-bg-2 hover:border-primary/30 hover:bg-dark-bg-3 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2 text-light-text group-hover:text-primary transition-colors">{interview.title}</h3>
                            <p className="text-sm text-light-text/60">
                              {interview.company ?? 'General Practice'} • {new Date(interview.startedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{interview.score}%</div>
                            <p className="text-xs text-light-text/60">Score</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="p-8 rounded-2xl border border-primary/10 bg-dark-bg-2 h-fit"
              >
                <h2 className="text-2xl font-black mb-6 text-light-text">Get Started</h2>

                <div className="space-y-3 mb-8">
                  <Link href="/interview" className="block">
                    <Button className="w-full" variant="primary">
                      Start New Interview
                    </Button>
                  </Link>

                  <Link href="/coding" className="block">
                    <Button className="w-full" variant="secondary">
                      Coding Arena
                    </Button>
                  </Link>

                </div>

                <div className="border-t border-primary/10 pt-8">
                  <h3 className="font-semibold mb-4 text-light-text">Skills Progress</h3>
                  <div className="space-y-4">
                    {skillProgressList.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-light-text/80">{item.skill}</span>
                          <span className="text-xs text-primary">{item.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-dark-bg-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
