import { Container } from 'typedi';
import slugify from 'slugify';
import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { startOfDay, addDays } from 'date-fns';
import { AuthorizedContext } from '../../../context';
import { CreateEventsResponse } from '../../types/Event';
import EventCreateInput from '../../input/EventCreateInput';
import EventRepository from '../../../repositories/eventRepository';

@Resolver()
export default class CreateEventResolver {
  @Authorized()
  @Mutation(() => CreateEventsResponse, { description: 'Create a new repetition event' })
  async createEvent(@Arg('input') input: EventCreateInput, @Ctx() ctx: AuthorizedContext) {
    const eventRepository = Container.get(EventRepository);

    const { title, subjectId, startDate, frequency } = input;
    const eventSlug = slugify(title, { lower: true });
    const eventIdentifier = `${eventSlug}-${new Date().getTime()}`;

    const newRepetitions = frequency.map((freq, index) => ({
      title,
      subjectId,
      repetition: index + 1,
      identifier: eventIdentifier,
      userId: ctx.auth.id,
      date: addDays(startOfDay(startDate), freq),
    }));

    const { count } = await eventRepository.createRepetitions(newRepetitions);
    const repetitions = await eventRepository.getRepetitionsByIdentifier(eventIdentifier);

    return { count, repetitions };
  }
}
