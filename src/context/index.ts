import { Request } from 'express';
import { Logger } from 'pino';
import { v4 as uuidV4 } from 'uuid';
import { Service, Inject } from 'typedi';
import AuthService from '../services/authService';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

interface BaseContext {
  user?: AuthUser;
  logger?: Logger;
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
      const logger = req.app.locals.logger as Logger;
      const childLogger = logger.child({
        correlationId: uuidV4(),
      });

      try {
        const decodedToken = this.authService.decodeToken(authorization as string);
        return {
          user: decodedToken,
          logger: childLogger,
        };
      } catch (err) {
        logger.error('Authentication token expired');
        return {
          authExpired: err.name === 'TokenExpiredError',
        };
      }
    };
  }
}
