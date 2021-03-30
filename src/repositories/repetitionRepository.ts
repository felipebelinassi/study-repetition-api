import { Inject, Service } from 'typedi';
import { PrismaClient } from '@prisma/client';

interface RepetitionParams {
  userId: string;
  identifier: string;
  subjectId: string;
  repetition: number;
  title: string;
  date: Date;
}

@Service()
export default class RepetitionRepository {
  @Inject('prisma')
  private prisma!: PrismaClient;

  async createRepetitions(params: RepetitionParams[]) {
    return this.prisma.event.createMany({
      data: params,
    });
  }

  async getRepetitionsByIdentifier(identifier: string) {
    return this.prisma.event.findMany({
      where: { identifier },
      include: {
        subject: true,
      },
    });
  }
}
