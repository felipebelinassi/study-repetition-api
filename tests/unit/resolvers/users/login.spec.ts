import { Container } from 'typedi';
import LoginResolver from '../../../../src/graphql/resolvers/user/login';
import UserRepository from '../../../../src/repositories/userRepository';
import AuthService from '../../../../src/services/authService';

const getUserSpy = jest.fn();

const userRepositoryMock = jest.fn().mockImplementation(() => ({
  getByEmail: getUserSpy,
}));

Container.set(UserRepository, userRepositoryMock());

describe('Login mutation unit tests', () => {
  it('should throw an error if user is not found in database', async () => {
    const fakeEmail = 'johndoe@gmail.com';
    const fakePassword = 'p4$$w0rd';

    getUserSpy.mockResolvedValue(null);

    const resolver = new LoginResolver();
    const response = resolver.login(fakeEmail, fakePassword);
    await expect(() => response).rejects.toThrow(Error);
  });

  it('should throw an error if user password does not match with registered password', async () => {
    const fakeEmail = 'johndoe@gmail.com';
    const fakePassword = 'p4$$w0rd';

    getUserSpy.mockResolvedValue({
      userId: 'db78cf2c-876e-4f00-b2c6-f228eb823b19',
      email: 'johndoe@gmail.com',
      password: 'password',
    });

    const resolver = new LoginResolver();
    const response = resolver.login(fakeEmail, fakePassword);
    await expect(() => response).rejects.toThrow(Error);
  });

  it('should authenticated user and return a valid auth token', async () => {
    const fakeEmail = 'johndoe@gmail.com';
    const fakePassword = 'p4$$w0rd';
    const fakeUser = {
      id: 'db78cf2c-876e-4f00-b2c6-f228eb823b19',
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      createdAt: new Date(),
    };

    const hashedPassword = await new AuthService().hashPassword(fakePassword);

    getUserSpy.mockResolvedValue({
      ...fakeUser,
      password: hashedPassword,
    });

    const resolver = new LoginResolver();
    const response = await resolver.login(fakeEmail, fakePassword);
    expect(response).toEqual({
      token: expect.any(String),
      user: expect.objectContaining(fakeUser),
    });
  });
});
