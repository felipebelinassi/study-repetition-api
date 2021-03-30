import { Container } from 'typedi';
import faker from 'faker';
import CreateRepetitionsResolver from '../../../../src/graphql/resolvers/repetition/createRepetitions';
import RepetitionRepository from '../../../../src/repositories/repetitionRepository';

const createRepetitionsSpy = jest.fn();
const getRepetitionsSpy = jest.fn();

const repetitionRepositoryMock = jest.fn().mockImplementation(() => ({
  createRepetitions: createRepetitionsSpy,
  getRepetitionsByIdentifier: getRepetitionsSpy,
}));

Container.set(RepetitionRepository, repetitionRepositoryMock());

const mockAuthContext = {
  id: faker.random.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
};

describe('Create event mutation unit tests', () => {
  it('should create quantity of repetitions as defined by the payload', async () => {
    const fakeContext = { user: mockAuthContext, authExpired: false };
    const fakeRepetition = {
      title: faker.random.words(),
      subjectId: faker.random.uuid(),
      frequency: [0, 1, 7, 14, 28],
      startDate: new Date(),
    };
    const expectedCount = fakeRepetition.frequency.length;

    createRepetitionsSpy.mockResolvedValue({ count: expectedCount });
    getRepetitionsSpy.mockResolvedValue([]);

    const resolver = new CreateRepetitionsResolver();
    const response = await resolver.createRepetitions(fakeRepetition, fakeContext);
    expect(createRepetitionsSpy).toHaveBeenCalledWith(expect.any(Array));
    expect(createRepetitionsSpy.mock.calls[0][0]).toHaveLength(expectedCount);
    expect(response).toEqual({
      count: expectedCount,
      repetitions: [],
    });
  });
});
