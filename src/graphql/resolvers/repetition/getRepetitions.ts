import { Container } from 'typedi';
import { Resolver, Query, Arg, Ctx, Authorized } from 'type-graphql';
import { isValid, startOfDay, endOfDay } from 'date-fns';
import { AuthorizedContext } from '../../../context';
import { Repetition } from '../../types/Repetition';
import RepetitionRepository from '../../../repositories/repetitionRepository';

@Resolver()
export default class GetRepetitionsResolver {
  @Authorized()
  @Query(() => [Repetition], { description: 'Get repetitions by a given date' })
  async getRepetitions(
    @Ctx() ctx: AuthorizedContext,
    @Arg('date', { nullable: true }) givenDate?: Date,
  ) {
    const repetitionRepository = Container.get(RepetitionRepository);

    const userId = ctx.user.id;
    const date = givenDate && isValid(givenDate) ? givenDate : new Date();
    const dateStartTime = startOfDay(date);
    const dateEndTime = endOfDay(date);

    const repetitions = await repetitionRepository.getByTimeRange(
      userId,
      dateStartTime,
      dateEndTime,
    );
    return repetitions;
  }
}
