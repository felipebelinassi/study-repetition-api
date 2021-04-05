import { ResolverData } from 'type-graphql';
import loggerMock from '../../doubles/mocks/logger';
import { AuthorizedContext } from '../../../src/context';
import authChecker from '../../../src/helpers/authChecker';

describe('Auth checker unit tests', () => {
  it('should throw Unauthorized access if token is not valid or not informed', () => {
    const fakeContext = {
      context: {
        authExpired: false,
        logger: loggerMock,
      },
    } as ResolverData<AuthorizedContext>;

    expect(() => authChecker(fakeContext, [])).toThrow('Unauthorized access');
  });

  it('should throw Expired token if token is expired', () => {
    const fakeContext = {
      context: {
        authExpired: true,
        logger: loggerMock,
      },
    } as ResolverData<AuthorizedContext>;

    expect(() => authChecker(fakeContext, [])).toThrow('Token expired');
  });

  it('should return true if token was decoded with success', () => {
    const fakeContext = {
      context: {
        user: {
          id: 'user-id',
          email: 'user@email.com',
          username: 'user',
        },
        logger: loggerMock,
      },
    } as ResolverData<AuthorizedContext>;

    const response = authChecker(fakeContext, []);
    expect(response).toBeTruthy();
  });
});
