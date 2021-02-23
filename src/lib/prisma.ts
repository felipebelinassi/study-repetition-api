import { PrismaClient, User } from '@prisma/client';

const beforeCreateUser = (instance: User) => {
  const user = instance;
  // TODO: add authorization service
  const hashedPassword = 'aaa';

  user.password = hashedPassword;
};

const createConnection = () => {
  const prisma = new PrismaClient();

  // Add prisma hooks
  prisma.$use(async (params, next) => {
    const { model, action, args: { data } } = params;
    if (model === 'User' && action === 'create') {
      beforeCreateUser(data);
    }

    return next(params);
  });

  return prisma;
};

export default createConnection;
