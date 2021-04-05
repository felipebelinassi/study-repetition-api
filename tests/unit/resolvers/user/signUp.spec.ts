import faker from 'faker';
import { Container } from 'typedi';
import loggerMock from '../../../doubles/mocks/logger';
import SignUpResolver from '../../../../src/graphql/resolvers/user/signUp';
import UserRepository from '../../../../src/repositories/userRepository';

const createUserSpy = jest.fn((args) => ({
  ...args,
  id: faker.random.uuid(),
  password: faker.random.word(),
  createdAt: new Date().toString(),
}));

const userRepositoryMock = jest.fn().mockImplementation(() => ({
  create: createUserSpy,
}));

Container.set(UserRepository, userRepositoryMock());

const fakeContext = { logger: loggerMock };

describe('Sign up mutation unit tests', () => {
  it('should return the created user', async () => {
    const fakeUserParams = {
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      password: 'p4$$w0rd',
    };

    const resolver = new SignUpResolver();
    const response = await resolver.signUp(fakeContext, fakeUserParams);

    expect(response).toEqual(
      expect.objectContaining({
        ...fakeUserParams,
        password: expect.any(String),
      }),
    );
  });
});
