import { Resolver, Mutation, Arg } from 'type-graphql';
import User from '../../types/User';
import UserInputCreate from '../../input/UserCreateInput';
import createRepositories from '../../../repositories';
import services from '../../../services';

@Resolver()
class SignUpResolver {
  @Mutation(() => User, { description: 'Creates a new user on database' })
  async signUp(@Arg('input') input: UserInputCreate) {
    const { user } = createRepositories();
    const { authService } = services;

    const hashedPassword = await authService.hashPassword(input.password);

    return user.create({
      ...input,
      password: hashedPassword,
    });
  }
}

export default SignUpResolver;
