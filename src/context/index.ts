import { Request } from 'express';
import { Service, Inject } from 'typedi';
import AuthService from '../services/authService';

export interface AuthContext {
  id: string;
  username: string;
  email: string;
}

export interface AuthorizedContext {
  auth: AuthContext;
  authExpired?: boolean;
}

@Service()
export default class Context {
  @Inject()
  private authService!: AuthService;

  createContext() {
    return ({ req }: { req: Request }) => {
      const { authorization } = req.headers;
      try {
        const decodedToken = this.authService.decodeToken(authorization as string);
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
