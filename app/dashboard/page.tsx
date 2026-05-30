'use client';

import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Flame, Zap, BarChart3, BookOpen } from 'lucide-react';
import { Button } from '@/components/common/Button';
import Link from 'next/link';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Interviews',
      value: '12',
      icon: BookOpen,
      change: '+2 this week',
    },
    {
      title: 'Average Score',
      value: '82%',
      icon: BarChart3,
      change: '+5% improvement',
    },
    {
      title: 'Current Streak',
      value: '7 days',
      icon: Flame,
      change: 'Keep it up!',
    },
    {
      title: 'Total XP',
      value: '2,450',
      icon: Zap,
      change: '+250 earned',
    },
  ];

  const recentInterviews = [
    {
      id: 1,
      title: 'Technical Interview',
      company: 'Google',
      date: '2 days ago',
      score: 85,
    },
    {
      id: 2,
      title: 'HR Round',
      company: 'Microsoft',
      date: '5 days ago',
      score: 78,
    },
    {
      id: 3,
      title: 'System Design',
      company: 'Meta',
      date: '1 week ago',
      score: 88,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Header isLoggedIn={true} userName="John" />

      <div className="container-max py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-black mb-2">Welcome Back, John! 👋</h1>
          <p className="text-[#ffffff]/60">Continue your interview preparation journey</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[#ffffff]/60 text-sm font-medium mb-2">{stat.title}</p>
                    <p className="text-4xl font-black">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-[#d94f00]/20 flex items-center justify-center">
                    <Icon size={24} className="text-[#d94f00]" />
                  </div>
                </div>
                <p className="text-sm text-[#d94f00]">{stat.change}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Interviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">Recent Interviews</h2>
              <Link href="/dashboard/interviews">
                <Button size="sm" variant="outline">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="p-4 rounded-lg bg-[#0f0f0f] border border-gray-700 hover:border-[#d94f00]/50 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{interview.title}</h3>
                      <p className="text-sm text-[#ffffff]/60">
                        {interview.company} • {interview.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#d94f00]">{interview.score}%</div>
                      <p className="text-xs text-[#ffffff]/60">Score</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card"
          >
            <h2 className="text-2xl font-black mb-6">Get Started</h2>

            <div className="space-y-4">
              <Link href="/interview">
                <Button className="w-full" variant="primary">
                  Start New Interview
                </Button>
              </Link>

              <Link href="/coding">
                <Button className="w-full" variant="secondary">
                  Coding Arena
                </Button>
              </Link>

              <Link href="/dashboard/resume">
                <Button className="w-full" variant="secondary">
                  Upload Resume
                </Button>
              </Link>

              <Link href="/dashboard/analytics">
                <Button className="w-full" variant="secondary">
                  View Analytics
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <h3 className="font-semibold mb-4">Skills to Improve</h3>
              <div className="space-y-3">
                {[
                  { skill: 'System Design', level: 3 },
                  { skill: 'Communication', level: 4 },
                  { skill: 'Problem Solving', level: 5 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.skill}</span>
                      <span className="text-[#ffffff]/60">Level {item.level}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-700">
                      <div
                        className="h-full rounded-full bg-[#d94f00] transition-all"
                        style={{ width: `${item.level * 20}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
