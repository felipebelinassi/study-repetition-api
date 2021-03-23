import { Request } from 'express';
import { Service, Inject } from 'typedi';
import AuthService from '../services/authService';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

interface BaseContext {
  user?: AuthUser;
  authExpired?: boolean;
}

export type AuthorizedContext = Required<BaseContext>;

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
          user: decodedToken,
        };
      } catch (err) {
        return {
          authExpired: err.name === 'TokenExpiredError',
        };
      }
    };
  }
}
