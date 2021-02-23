import SignUpResolver from '../../../../src/graphql/resolvers/user/signUp';

const createUserSpy = jest.fn();

jest.mock('../../../../src/repositories', () => 
  jest.fn(() => ({
    user: { create: createUserSpy },
  })),
);

describe('Sign up mutation unit tests', () => {
  it('should return the created user', async () => {
    const fakeUserParams = { 
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      password: 'p4$$w0rd',
    };

    createUserSpy.mockResolvedValue({
      ...fakeUserParams,
      id: 'db78cf2c-876e-4f00-b2c6-f228eb823b19',
      createdAt: new Date().toString(),
    });

    const resolver = new SignUpResolver();
    const response = await resolver.signUp(fakeUserParams);
    expect(response).toEqual(expect.objectContaining({
      ...fakeUserParams,
      password: expect.any(String),
    }));
  });
});