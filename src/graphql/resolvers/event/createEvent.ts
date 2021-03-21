import { Container } from 'typedi';
import slugify from 'slugify';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { startOfDay, addDays } from 'date-fns';
import { CreateEventsResponse } from '../../types/Event';
import EventCreateInput from '../../input/EventCreateInput';
import EventRepository from '../../../repositories/eventRepository';

@Resolver()
export default class CreateEventResolver {
  @Mutation(() => CreateEventsResponse, { description: 'Create a new repetition event' })
  async createEvent(@Arg('input') input: EventCreateInput) {
    const eventRepository = Container.get(EventRepository);

    const { title, subjectId, startDate, frequency } = input;
    const eventSlug = slugify(title, { lower: true });
    const eventIdentifier = `${eventSlug}-${new Date().getTime()}`;

    const newEvents = frequency.map((freq, index) => ({
      title,
      subjectId,
      repetition: index + 1,
      identifier: eventIdentifier,
      userId: '11f6decd-b658-441b-87da-ba74ac49fe1c',
      date: addDays(startOfDay(startDate), freq),
    }));

    const { count } = await eventRepository.createEvents(newEvents);
    const events = await eventRepository.getEventsByIdentifier(eventIdentifier);

    return { count, events };
  }
}
