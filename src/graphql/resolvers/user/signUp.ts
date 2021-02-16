import { Resolver, Mutation, Arg } from 'type-graphql';
import User from '../../types/User';
import UserInputCreate from '../../input/UserCreateInput';

@Resolver()
class SignUpResolver {
  @Mutation(() => User, { description: 'Creates a new user on database' })
  async signUp(
    @Arg('input') input: UserInputCreate,
  ): Promise<User> {

    return {
      ...input,
      id: 'fake-id',
      createdAt: new Date().toISOString(),
    };
  }
}

export default SignUpResolver;
