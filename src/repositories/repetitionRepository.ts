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

  async create(params: RepetitionParams[]) {
    return this.prisma.repetition.createMany({
      data: params,
    });
  }

  async getByUserAndId(userId: string, repetitionId: string) {
    return this.prisma.repetition.findFirst({
      where: {
        userId,
        id: repetitionId,
      },
    });
  }

  async getByIdentifier(identifier: string) {
    return this.prisma.repetition.findMany({
      where: { identifier },
      include: {
        subject: true,
      },
    });
  }

  async getByTimeRange(userId: string, start: Date, end: Date) {
    return this.prisma.repetition.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lt: end,
        },
      },
      include: {
        subject: true,
      },
      orderBy: {
        repetition: 'desc',
      },
    });
  }

  async deleteById(id: string) {
    return this.prisma.repetition.delete({
      where: { id },
    });
  }

  async deleteByIdentifier(identifier: string) {
    return this.prisma.repetition.deleteMany({
      where: { identifier },
    });
  }

  async deleteNextRepetitionsByIdentifier(identifier: string, repetition: number) {
    return this.prisma.repetition.deleteMany({
      where: {
        identifier,
        repetition: { gte: repetition },
      },
    });
  }
}
