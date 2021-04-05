import { AuthChecker } from 'type-graphql';
import { AuthorizedContext } from '../context';

const authChecker: AuthChecker<AuthorizedContext> = ({ context }) => {
  const { user, authExpired, logger } = context;
  if (user) return true;

  logger.error('Invalid authorization token');
  if (authExpired) throw new Error('Token expired');
  throw new Error('Unauthorized access');
};

export default authChecker;
