import { Container } from 'typedi';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { startOfDay, addDays } from 'date-fns';
import { v4 as uuidV4 } from 'uuid';
import { CreateEventsResponse } from '../../types/Event';
import EventCreateInput from '../../input/EventCreateInput';
import EventRepository from '../../../repositories/eventRepository';

@Resolver()
export default class CreateEventResolver {
  @Mutation(() => CreateEventsResponse, { description: 'Create a new repetition event' })
  async createEvent(@Arg('input') input: EventCreateInput) {
    const eventRepository = Container.get(EventRepository);

    const { title, startDate, frequency } = input;

    const newEvents = frequency.map((freq, index) => ({
      // TODO: Remove hardcoded values
      id: uuidV4(),
      title,
      subjectId: '2824a818-b774-45c0-a5d2-1abc05da2323',
      repetition: index + 1,
      userId: 'c2ae9a9f-8057-4034-a0c8-1e579a03f09b',
      date: addDays(startOfDay(startDate), freq),
    }));

    const eventsId = newEvents.map((event) => event.id);

    const { count } = await eventRepository.createEvents(newEvents);
    const events = await eventRepository.getEventListById(eventsId);

    return { count, events };
  }
}
