import { AuthChecker } from 'type-graphql';
import { AuthorizedContext } from '../context';

const authChecker: AuthChecker<AuthorizedContext> = ({ context }) => {
  const { auth, authExpired } = context;
  if (auth) return true;

  if (authExpired) throw new Error('Token expired');
  throw new Error('Unauthorized access');
};

export default authChecker;
