import { Inject, Service } from 'typedi';
import { PrismaClient } from '@prisma/client';

interface EventParams {
  userId: string;
  subjectId: string;
  repetition: number;
  title: string;
  date: Date;
}

@Service()
export default class EventRepository {
  @Inject('prisma')
  private prisma!: PrismaClient;

  async createEvents(params: EventParams[]) {
    return await this.prisma.event.createMany({
      data: params,
    });
  }

  async getEventListById(ids: string[]) {
    return await this.prisma.event.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        subject: true,
      },
    });
  }
}
