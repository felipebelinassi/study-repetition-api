import { Container } from 'typedi';
import faker from 'faker';
import loggerMock from '../../../doubles/mocks/logger';
import DeleteOneRepetitionResolver from '../../../../src/graphql/resolvers/repetition/deleteOneRepetition';
import RepetitionRepository from '../../../../src/repositories/repetitionRepository';

const getRepetitionSpy = jest.fn();
const deleteRepetitionSpy = jest.fn();

const repetitionRepositoryMock = jest.fn().mockImplementation(() => ({
  getByUserAndId: getRepetitionSpy,
  deleteById: deleteRepetitionSpy,
}));

Container.set(RepetitionRepository, repetitionRepositoryMock());

const mockAuthContext = {
  id: faker.random.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
};

const fakeAuthContext = { user: mockAuthContext, authExpired: false, logger: loggerMock };

describe('Delete one repetition unit tests', () => {
  it('should successfully delete user repetition by id', async () => {
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

    const resolver = new DeleteOneRepetitionResolver();
    const response = await resolver.deleteOneRepetition(fakeAuthContext, fakeUserRepetition.id);

    expect(deleteRepetitionSpy).toBeCalledWith(fakeUserRepetition.id);
    expect(response).toHaveProperty('success', true);
  });

  it('should not allow to delete not existent repetition', async () => {
    const fakeRepetitionId = faker.random.uuid();

    getRepetitionSpy.mockResolvedValue(null);

    const resolver = new DeleteOneRepetitionResolver();
    const response = resolver.deleteOneRepetition(fakeAuthContext, fakeRepetitionId);
    await expect(() => response).rejects.toThrow('NOT_ALLOWED');
  });

  it('should not allow to delete another user repetition', async () => {
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

    const resolver = new DeleteOneRepetitionResolver();
    const response = resolver.deleteOneRepetition(fakeAuthContext, fakeUserRepetition.id);
    await expect(() => response).rejects.toThrow('NOT_ALLOWED');
  });
});
