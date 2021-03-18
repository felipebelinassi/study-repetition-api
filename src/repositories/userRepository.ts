import { Inject, Service } from 'typedi';
import { PrismaClient, User } from '@prisma/client';
import AuthService from '../services/authService';

type UserParams = Omit<User, 'id' | 'createdAt'>;

@Service()
export default class UserRepository {
  @Inject('prisma')
  private prisma!: PrismaClient;

  @Inject()
  private authService!: AuthService;

  async create(params: UserParams) {
    const hashedPassword = await this.authService.hashPassword(params.password);

    const user = await this.prisma.user.create({
      data: {
        ...params,
        password: hashedPassword,
      },
    });

    return user;
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
