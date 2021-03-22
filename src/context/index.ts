import { Request } from 'express';
import Container, { Service } from 'typedi';
import AuthService from '../services/authService';

export interface AuthContext {
  id: string;
  username: string;
  email: string;
}

export interface AuthorizedContext {
  auth?: AuthContext;
  authExpired?: boolean;
}

@Service()
export default class Context {
  createContext() {
    const authService = Container.get(AuthService);

    return ({ req }: { req: Request }) => {
      const { authorization } = req.headers;
      try {
        const decodedToken = authService.decodeToken(authorization as string);
        return {
          auth: decodedToken,
        };
      } catch (err) {
        return {
          authExpired: err.name === 'TokenExpiredError',
        };
      }
    };
  }
}
