import { Inject, Service } from 'typedi';
import { PrismaClient } from '@prisma/client';

@Service()
export default class SubjectRepository {
  @Inject('prisma')
  private prisma!: PrismaClient;

  async createSubject(userId: string, title: string) {
    return this.prisma.subject.create({
      data: {
        userId,
        title,
      },
    });
  }
}
