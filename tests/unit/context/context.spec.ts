import { Request } from 'express';
import AuthService from '../../../src/services/authService';
import Context from '../../../src/context';

describe('GQL context unit tests', () => {
  it('should verify a JWT token return decoded info', () => {
    const mockData = { data: 'fake' };
    const jwtToken = new AuthService().generateToken(mockData);
    const reqFake = ({
      headers: {
        authorization: jwtToken,
      },
    } as unknown) as Request;

    const decodedToken = new Context().createContext()({ req: reqFake });
    expect(decodedToken).toHaveProperty('auth', expect.objectContaining(mockData));
  });

  it('should not return token data when there is a problem on verification', () => {
    const reqFake = ({
      headers: {
        authorization: 'invalid token',
      },
    } as unknown) as Request;

    const decodedToken = new Context().createContext()({ req: reqFake });
    expect(decodedToken).not.toHaveProperty('auth');
    expect(decodedToken).toEqual({
      authExpired: false,
    });
  });
});
