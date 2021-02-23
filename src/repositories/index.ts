import { PrismaClient } from '@prisma/client';
import userRepository from './userRepository';

export interface Repositories {
  user: ReturnType<typeof userRepository>;
}

export default function createRepositories(): Repositories {
  const prisma = new PrismaClient();

  return {
    user: userRepository(prisma),
  };
}