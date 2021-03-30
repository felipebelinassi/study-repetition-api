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
    return this.prisma.repetition.createMany({
      data: params,
    });
  }

  async getRepetitionsByIdentifier(identifier: string) {
    return this.prisma.repetition.findMany({
      where: { identifier },
      include: {
        subject: true,
      },
    });
  }
}
