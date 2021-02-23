import { PrismaClient, User } from '@prisma/client';

interface UserParams extends Omit<User, 'id' | 'createdAt'> {}

export interface UserRepository {
  create: (params: UserParams) => Promise<User>;
}

export default (prisma: PrismaClient) => {
  const create = async (params: UserParams) => {
    const user = await prisma.user.create({
      data: { ...params },
    });

    return user;
  };

  return {
    create,
  };
};