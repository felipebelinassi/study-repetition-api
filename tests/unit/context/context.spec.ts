import { Request } from 'express';
import { Container } from 'typedi';
import AuthService from '../../../src/services/authService';
import Context from '../../../src/context';
import loggerMock from '../../doubles/mocks/logger';

describe('GQL context unit tests', () => {
  it('should verify a JWT token return decoded info', () => {
    const mockData = { data: 'fake' };
    const jwtToken = new AuthService().generateToken(mockData);
    const reqFake = ({
      headers: {
        authorization: jwtToken,
      },
      app: {
        locals: {
          logger: loggerMock,
        },
      },
    } as unknown) as Request;

    const context = Container.get(Context);
    const decodedToken = context.createContext()({ req: reqFake });
    expect(decodedToken).toHaveProperty('user', expect.objectContaining(mockData));
    expect(decodedToken).toHaveProperty('logger');
  });

  it('should not return token data when there is a problem on verification', () => {
    const reqFake = ({
      headers: {
        authorization: 'invalid token',
      },
      app: {
        locals: {
          logger: loggerMock,
        },
      },
    } as unknown) as Request;

    const context = Container.get(Context);
    const decodedToken = context.createContext()({ req: reqFake });
    expect(decodedToken).not.toHaveProperty('user');
    expect(decodedToken).toHaveProperty('logger');
    expect(decodedToken).toEqual({
      authExpired: false,
    });
  });
});
