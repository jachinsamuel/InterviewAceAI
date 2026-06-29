import { PrismaClient } from '@prisma/client';

// Create a single Prisma client instance to prevent multiple clients in dev
declare global {
  var prisma: PrismaClient | undefined;
}

let _prisma: PrismaClient | undefined = undefined;

// For local development and build environments where a valid DATABASE_URL or Prisma engine
// may not be available, require explicit opt-in by setting PRISMA_CLIENT_ENABLED=true in env.
// This avoids build-time errors when Prisma cannot be initialized.

const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

if (process.env.PRISMA_CLIENT_ENABLED === 'true' && process.env.DATABASE_URL && !isBuildPhase) {
  _prisma = global.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== 'production') global.prisma = _prisma;
} else {
  // Database client not enabled or building; keep prisma undefined. Consumers should check before use.
  _prisma = undefined;
}

export const prisma = _prisma;