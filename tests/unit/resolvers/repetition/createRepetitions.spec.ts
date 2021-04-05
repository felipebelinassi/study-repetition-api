import { Container } from 'typedi';
import faker from 'faker';
import loggerMock from '../../../doubles/mocks/logger';
import CreateRepetitionsResolver from '../../../../src/graphql/resolvers/repetition/createRepetitions';
import RepetitionRepository from '../../../../src/repositories/repetitionRepository';

const createRepetitionsSpy = jest.fn();
const getRepetitionsSpy = jest.fn();

const repetitionRepositoryMock = jest.fn().mockImplementation(() => ({
  create: createRepetitionsSpy,
  getByIdentifier: getRepetitionsSpy,
}));

Container.set(RepetitionRepository, repetitionRepositoryMock());

const mockAuthContext = {
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
};

const fakeAuthContext = { user: mockAuthContext, authExpired: false, logger: loggerMock };

describe('Create repetitions mutation unit tests', () => {
  it('should create quantity of repetitions as defined by the payload', async () => {
    const fakeRepetition = {
      title: faker.random.words(),
      subjectId: faker.datatype.uuid(),
      frequency: [0, 1, 7, 14, 28],
      startDate: new Date(),
    };
    const expectedCount = fakeRepetition.frequency.length;

    createRepetitionsSpy.mockResolvedValue({ count: expectedCount });
    getRepetitionsSpy.mockResolvedValue([]);

    const resolver = new CreateRepetitionsResolver();
    const response = await resolver.createRepetitions(fakeAuthContext, fakeRepetition);
    expect(createRepetitionsSpy).toHaveBeenCalledWith(expect.any(Array));
    expect(createRepetitionsSpy.mock.calls[0][0]).toHaveLength(expectedCount);
    expect(response).toEqual({
      count: expectedCount,
      repetitions: [],
    });
  });
});
