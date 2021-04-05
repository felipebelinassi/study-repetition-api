import { Container } from 'typedi';
import slugify from 'slugify';
import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { startOfDay, addDays } from 'date-fns';
import { AuthorizedContext } from '../../../context';
import { CreateRepetitionsResponse } from '../../types/Repetition';
import RepetitionCreateInput from '../../input/RepetitionCreateInput';
import RepetitionRepository from '../../../repositories/repetitionRepository';

@Resolver()
export default class CreateRepetitionsResolver {
  @Authorized()
  @Mutation(() => CreateRepetitionsResponse, { description: 'Create a new repetition event' })
  async createRepetitions(
    @Arg('input') input: RepetitionCreateInput,
    @Ctx() ctx: AuthorizedContext,
  ) {
    ctx.logger.info('Creating new repetitions');

    const repetitionRepository = Container.get(RepetitionRepository);

    const { title, subjectId, startDate, frequency } = input;
    const eventSlug = slugify(title, { lower: true });
    const eventIdentifier = `${eventSlug}-${new Date().getTime()}`;

    const newRepetitions = frequency.map((freq, index) => ({
      title,
      subjectId,
      repetition: index + 1,
      identifier: eventIdentifier,
      userId: ctx.user.id,
      date: addDays(startOfDay(startDate), freq),
    }));

    const { count } = await repetitionRepository.create(newRepetitions);
    const repetitions = await repetitionRepository.getByIdentifier(eventIdentifier);

    return { count, repetitions };
  }
}
