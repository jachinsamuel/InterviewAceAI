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

  const questions = [
    'Tell me about your most challenging project',
    'What are your strengths and weaknesses?',
    'How do you handle conflict in a team?',
    'Describe your ideal work environment',
    'What are your long-term career goals?',
  ];

  return (
    <main className="min-h-screen bg-dark-bg">
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
            <div className="mb-8 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 aspect-video relative flex items-center justify-center shadow-2xl shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent animate-pulse" />
              <div className="relative z-10 text-center bg-zinc-950/40 p-4 rounded-xl backdrop-blur-sm">
                <p className="text-xl font-semibold mb-1 text-light-text">AI Interviewer</p>
                <p className="text-sm text-green-400 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  Active Session
                </p>
              </div>
            </div>

            {/* Question */}
            <div className="bg-dark-bg-2 rounded-lg p-6 mb-8 border border-zinc-800">
              <p className="text-light-text/60 text-sm font-medium mb-2">Current Question</p>
              <p className="text-xl font-semibold">{currentQuestion}</p>
            </div>

            {/* Answer Input */}
            <div className="space-y-4">
              <label className="block text-light-text/60 text-sm font-medium">Your Answer</label>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here or speak using the microphone button..."
                aria-label="Your answer to the interview question"
                className="w-full h-32 px-4 py-3 rounded-lg bg-dark-bg-2 border border-zinc-800 text-light-text placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
              />

              <div className="flex gap-3">
                <Button
                  variant={isRecording ? 'primary' : 'secondary'}
                  onClick={() => setIsRecording(!isRecording)}
                  className="flex-1"
                  icon={isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                  aria-label={isRecording ? 'Stop recording your answer' : 'Start recording your answer'}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  icon={<Send size={20} />}
                  aria-label="Submit your answer"
                >
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
              <p className="text-light-text/60 text-sm mb-2">Time Remaining</p>
              <p className="text-5xl font-black text-primary font-mono">5:30</p>
              <p className="text-xs text-light-text/60 mt-2">Per question</p>
            </div>

            {/* Progress */}
            <div className="card">
              <p className="text-light-text/60 text-sm font-medium mb-4">Progress</p>
              <div className="space-y-3">
                {questions.map((q, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      currentQuestion === q
                        ? 'bg-primary/20 text-primary border border-primary/50'
                        : 'bg-dark-bg-2 text-light-text/60 border border-zinc-800 hover:border-zinc-700'
                    }`}
                    onClick={() => setCurrentQuestion(q)}
                  >
                    Question {idx + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Interview Info */}
            <div className="card">
              <div className="space-y-3">
                <div>
                  <p className="text-light-text/60 text-xs mb-1">Interview Type</p>
                  <p className="font-semibold">HR Round</p>
                </div>
                <div>
                  <p className="text-light-text/60 text-xs mb-1">Difficulty</p>
                  <p className="font-semibold">Medium</p>
                </div>
                <div>
                  <p className="text-light-text/60 text-xs mb-1">Duration</p>
                  <p className="font-semibold">30 minutes</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2">
                <Button 
                  variant="secondary" 
                  className="w-full text-sm" 
                  icon={<SkipForward size={16} />}
                  aria-label="Skip to next question"
                >
                  Skip Question
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-sm" 
                  icon={<X size={16} />}
                  aria-label="End the interview session"
                >
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
