import { PrismaClient } from '@prisma/client';

const createConnection = () => {
  const prisma = new PrismaClient();
  return prisma;
};

export default createConnection;
