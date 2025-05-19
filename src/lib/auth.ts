// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from '@/generated/prisma';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';

const prisma = new PrismaClient();
export const auth = betterAuth({
  session: {
    expiresIn: 60 * 60 * 24,
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  cookie: {
    name: 'session',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  logger: {
    level: 'debug',
    transport: {
      type: 'console',
      options: {
        format: 'json',
      },
    },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
    },
  },
  crossSubDomainCookies: {
    enabled: true,
    domain: 'http://localhost:3000', // Domain with a leading period
  },
  plugins: [nextCookies()],
});
