import { Container } from 'typedi';
import faker from 'faker';
import CreateEventResolver from '../../../../src/graphql/resolvers/event/createEvent';
import EventRepository from '../../../../src/repositories/eventRepository';

const createRepetitionsSpy = jest.fn();
const getRepetitionsSpy = jest.fn();

const eventRepositoryMock = jest.fn().mockImplementation(() => ({
  createRepetitions: createRepetitionsSpy,
  getRepetitionsByIdentifier: getRepetitionsSpy,
}));

Container.set(EventRepository, eventRepositoryMock());

const mockAuthContext = {
  id: faker.random.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
};

describe('Create event mutation unit tests', () => {
  it('should create quantity of repetitions as defined by the payload', async () => {
    const fakeContext = { user: mockAuthContext, authExpired: false };
    const fakeEvent = {
      title: faker.random.words(),
      subjectId: faker.random.uuid(),
      frequency: [0, 1, 7, 14, 28],
      startDate: new Date(),
    };
    const expectedCount = fakeEvent.frequency.length;

    createRepetitionsSpy.mockResolvedValue({ count: expectedCount });
    getRepetitionsSpy.mockResolvedValue([]);

    const resolver = new CreateEventResolver();
    const response = await resolver.createEvent(fakeEvent, fakeContext);
    expect(createRepetitionsSpy).toHaveBeenCalledWith(expect.any(Array));
    expect(createRepetitionsSpy.mock.calls[0][0]).toHaveLength(expectedCount);
    expect(response).toEqual({
      count: expectedCount,
      repetitions: [],
    });
  });
});
