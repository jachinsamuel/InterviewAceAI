'use client';

import { useState } from 'react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { motion } from 'framer-motion';
import { Mic, MicOff, Send, SkipForward, X } from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function InterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(
    'Tell me about your most challenging project and how you overcame the difficulties'
  );
  const [userAnswer, setUserAnswer] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('5:30');

  const questions = [
    'Tell me about your most challenging project',
    'What are your strengths and weaknesses?',
    'How do you handle conflict in a team?',
    'Describe your ideal work environment',
    'What are your long-term career goals?',
  ];

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Header />

      <div className="container-max py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interviewer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 card"
          >
            {/* Video Area */}
            <div className="mb-8 rounded-xl overflow-hidden bg-gradient-to-br from-[#d94f00]/10 to-transparent border border-gray-700 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d94f00] to-orange-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-5xl">🤖</span>
                </div>
                <p className="text-xl font-semibold mb-2">AI Interviewer</p>
                <p className="text-sm text-[#ffffff]/60">Speaking...</p>
              </div>
            </div>

            {/* Question */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 mb-8 border border-gray-700">
              <p className="text-[#ffffff]/60 text-sm font-medium mb-2">Current Question</p>
              <p className="text-xl font-semibold">{currentQuestion}</p>
            </div>

            {/* Answer Input */}
            <div className="space-y-4">
              <label className="block text-[#ffffff]/60 text-sm font-medium">Your Answer</label>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here or speak using the microphone button..."
                className="w-full h-32 px-4 py-3 rounded-lg bg-[#1a1a1a] border border-gray-700 text-[#ffffff] placeholder-gray-500 focus:border-[#d94f00] focus:outline-none focus:ring-1 focus:ring-[#d94f00]/50 resize-none"
              />

              <div className="flex gap-3">
                <Button
                  variant={isRecording ? 'primary' : 'secondary'}
                  onClick={() => setIsRecording(!isRecording)}
                  className="flex-1"
                  icon={isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
                <Button variant="outline" className="flex-1" icon={<Send size={20} />}>
                  Submit Answer
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Timer */}
            <div className="card text-center">
              <p className="text-[#ffffff]/60 text-sm mb-2">Time Remaining</p>
              <p className="text-5xl font-black text-[#d94f00] font-mono">{timeRemaining}</p>
              <p className="text-xs text-[#ffffff]/60 mt-2">Per question</p>
            </div>

            {/* Progress */}
            <div className="card">
              <p className="text-[#ffffff]/60 text-sm font-medium mb-4">Progress</p>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    className={`p-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      num === 1
                        ? 'bg-[#d94f00]/20 text-[#d94f00] border border-[#d94f00]/50'
                        : 'bg-[#1a1a1a] text-[#ffffff]/60 border border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    Question {num}
                  </div>
                ))}
              </div>
            </div>

            {/* Interview Info */}
            <div className="card">
              <div className="space-y-3">
                <div>
                  <p className="text-[#ffffff]/60 text-xs mb-1">Interview Type</p>
                  <p className="font-semibold">HR Round</p>
                </div>
                <div>
                  <p className="text-[#ffffff]/60 text-xs mb-1">Difficulty</p>
                  <p className="font-semibold">Medium</p>
                </div>
                <div>
                  <p className="text-[#ffffff]/60 text-xs mb-1">Duration</p>
                  <p className="font-semibold">30 minutes</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                <Button variant="secondary" className="w-full text-sm" icon={<SkipForward size={16} />}>
                  Skip Question
                </Button>
                <Button variant="outline" className="w-full text-sm" icon={<X size={16} />}>
                  End Interview
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
