# InterviewAce AI

AI-powered interview preparation platform. Practice realistic mock interviews, get instant feedback, and improve your skills — completely free.

## Features

- **AI Mock Interviews** — Practice technical, behavioral, and HR interviews with adaptive AI
- **Real-Time Feedback** — Get instant analysis on clarity, depth, and communication
- **Voice & Text Input** — Answer naturally via speech or text
- **Coding Arena** — Practice coding problems with test cases
- **Performance Dashboard** — Track your progress, streaks, and skill growth
- **Resume-Based Questions** — AI generates tailored questions from your background

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Framer Motion
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js (Credentials)
- **AI**: OpenAI API (GPT-4, with offline fallback)
- **State**: Zustand
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- OpenAI API key (optional — works with fallback)

### Installation

```bash
git clone <your-repo-url>
cd interviewace-ai
npm install
```

### Environment Setup

Copy `.env` and configure:

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/interviewace"
PRISMA_CLIENT_ENABLED="true"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="sk-..."  # Optional
```

### Run

```bash
npx prisma migrate dev --name init
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
app/                    # Next.js App Router pages & API routes
├── api/                # REST API (auth, interviews, AI, dashboard)
├── auth/               # Login & signup pages
├── dashboard/          # User dashboard
└── interview/          # Interview practice room

src/
├── components/         # React components (common, landing)
├── lib/                # Utilities (auth, AI, Prisma, API helpers)
├── store/              # Zustand state management
├── styles/             # Global CSS + motion tokens
└── types/              # TypeScript interfaces

prisma/                 # Database schema & seed data
```

## Status

✅ Landing page & design system
✅ Authentication (signup, login, sessions)
✅ Dashboard with stats & progress tracking
✅ Interview room UI (voice & text)
✅ AI question generation & response analysis
✅ API routes (interviews, dashboard, AI)
🔄 Coding arena integration
🔄 Full voice recording pipeline

## License

MIT
