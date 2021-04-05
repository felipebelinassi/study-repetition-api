import { Container } from 'typedi';
import faker from 'faker';
import { startOfDay, endOfDay } from 'date-fns';
import loggerMock from '../../../doubles/mocks/logger';
import GetRepetitionsResolver from '../../../../src/graphql/resolvers/repetition/getRepetitions';
import RepetitionRepository from '../../../../src/repositories/repetitionRepository';

const getRepetitionsSpy = jest.fn();

const repetitionRepositoryMock = jest.fn().mockImplementation(() => ({
  getByTimeRange: getRepetitionsSpy,
}));

Container.set(RepetitionRepository, repetitionRepositoryMock());

const mockAuthContext = {
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
};

const fakeAuthContext = { user: mockAuthContext, authExpired: false, logger: loggerMock };

describe('Get repetitions query unit tests', () => {
  it('should get repetitions for current date', async () => {
    getRepetitionsSpy.mockResolvedValue([]);

    const resolver = new GetRepetitionsResolver();
    const response = await resolver.getRepetitions(fakeAuthContext);

    expect(getRepetitionsSpy).toHaveBeenCalledWith(
      mockAuthContext.id,
      startOfDay(new Date()),
      endOfDay(new Date()),
    );
    expect(response).toEqual([]);
  });

  it('should get repetitions for a given date', async () => {
    const fakeRepetitions = [
      {
        id: '0f8a2f81-44b7-47c8-8c91-0c97a200cc77',
        title: 'Test - Repetition #5',
        identifier: 'test-repetition-5-1617228260035',
        repetition: 5,
        date: '2021-03-31T22:00:00.000Z',
      },
      {
        id: 'e6ef9b1e-8a3a-4ac9-90f5-f72d6579c22f',
        identifier: 'test-repetition-4-1617228240259',
        title: 'Test - Repetition #4',
        repetition: 4,
        date: '2021-03-31T22:00:00.000Z',
      },
      {
        id: 'c5db8f56-ed23-46d2-a649-b47dec539309',
        identifier: 'test-repetition-1-1617228221192',
        title: 'Test - Repetition #1',
        repetition: 1,
        date: '2021-03-31T22:00:00.000Z',
      },
    ];
    const testDate = new Date('2021-01-04');

    getRepetitionsSpy.mockResolvedValue(fakeRepetitions);

    const resolver = new GetRepetitionsResolver();
    const response = await resolver.getRepetitions(fakeAuthContext, testDate);

    expect(getRepetitionsSpy).toHaveBeenCalledWith(
      mockAuthContext.id,
      startOfDay(testDate),
      endOfDay(testDate),
    );
    expect(response).toEqual(fakeRepetitions);
  });
});
