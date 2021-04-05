import { Container } from 'typedi';
import faker from 'faker';
import DeleteManyRepetitionsResolver from '../../../../src/graphql/resolvers/repetition/deleteManyRepetitions';
import RepetitionRepository from '../../../../src/repositories/repetitionRepository';

const getRepetitionSpy = jest.fn();
const deleteByIdentifierSpy = jest.fn();
const deleteNextRepetitionsSpy = jest.fn();

const repetitionRepositoryMock = jest.fn().mockImplementation(() => ({
  getByUserAndId: getRepetitionSpy,
  deleteByIdentifier: deleteByIdentifierSpy,
  deleteNextRepetitionsByIdentifier: deleteNextRepetitionsSpy,
}));

Container.set(RepetitionRepository, repetitionRepositoryMock());

const mockAuthContext = {
  id: faker.random.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
};

describe('Delete many repetitions unit tests', () => {
  it('should successfully delete all repetitions by identifier', async () => {
    const fakeContext = { user: mockAuthContext, authExpired: false };
    const fakeUserRepetition = {
      id: faker.random.uuid(),
      identifier: 'test-repetition-delete-1617228260035',
      subjectId: '832b3bc0-5661-4d40-8277-378bea5260ef',
      repetition: 1,
      title: 'Test - Repetition Delete',
      date: '2021-03-31T22:00:00.000Z',
      userId: mockAuthContext.id,
      createdAt: '2021-03-31T22:04:20.058Z',
    };

    getRepetitionSpy.mockResolvedValue(fakeUserRepetition);
    deleteByIdentifierSpy.mockResolvedValue({ count: 5 });

    const resolver = new DeleteManyRepetitionsResolver();
    const deleteAll = true;
    const response = await resolver.deleteManyRepetitionsFromOne(
      fakeContext,
      fakeUserRepetition.id,
      deleteAll,
    );

    expect(deleteByIdentifierSpy).toBeCalledWith(fakeUserRepetition.identifier);
    expect(response).toEqual({ success: true, count: 5 });
  });

  it('should successfully delete next repetitions', async () => {
    const fakeContext = { user: mockAuthContext, authExpired: false };
    const fakeUserRepetition = {
      id: faker.random.uuid(),
      identifier: 'test-repetition-delete-1617228260035',
      subjectId: '832b3bc0-5661-4d40-8277-378bea5260ef',
      repetition: 3,
      title: 'Test - Repetition Delete #2',
      date: '2021-03-31T22:00:00.000Z',
      userId: mockAuthContext.id,
      createdAt: '2021-03-31T22:04:20.058Z',
    };

    getRepetitionSpy.mockResolvedValue(fakeUserRepetition);
    deleteNextRepetitionsSpy.mockResolvedValue({ count: 3 });

    const resolver = new DeleteManyRepetitionsResolver();
    const response = await resolver.deleteManyRepetitionsFromOne(
      fakeContext,
      fakeUserRepetition.id,
    );

    expect(deleteNextRepetitionsSpy).toBeCalledWith(
      fakeUserRepetition.identifier,
      fakeUserRepetition.repetition,
    );
    expect(response).toEqual({ success: true, count: 3 });
  });

  it('should not allow to delete not existent repetition', async () => {
    const fakeContext = { user: mockAuthContext, authExpired: false };
    const fakeRepetitionId = faker.random.uuid();

    getRepetitionSpy.mockResolvedValue(null);

    const resolver = new DeleteManyRepetitionsResolver();
    const response = resolver.deleteManyRepetitionsFromOne(fakeContext, fakeRepetitionId);
    await expect(() => response).rejects.toThrow('NOT_ALLOWED');
  });

  it('should not allow to delete another user repetition', async () => {
    const fakeContext = { user: mockAuthContext, authExpired: false };
    const fakeUserRepetition = {
      id: faker.random.uuid(),
      identifier: 'test-repetition-delete-1617228260035',
      subjectId: '832b3bc0-5661-4d40-8277-378bea5260ef',
      repetition: 1,
      title: 'Test - Repetition Delete',
      date: '2021-03-31T22:00:00.000Z',
      userId: faker.random.uuid(),
      createdAt: '2021-03-31T22:04:20.058Z',
    };

    getRepetitionSpy.mockResolvedValue(fakeUserRepetition);

    const resolver = new DeleteManyRepetitionsResolver();
    const response = resolver.deleteManyRepetitionsFromOne(fakeContext, fakeUserRepetition.id);
    await expect(() => response).rejects.toThrow('NOT_ALLOWED');
  });
});
