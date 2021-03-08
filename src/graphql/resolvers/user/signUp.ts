import { Container } from 'typedi';
import { Resolver, Mutation, Arg } from 'type-graphql';
import User from '../../types/User';
import UserInputCreate from '../../input/UserCreateInput';
import AuthService from '../../../services/authService';
import UserRepository from '../../../repositories/userRepository';

@Resolver()
class SignUpResolver {
  @Mutation(() => User, { description: 'Creates a new user on database' })
  async signUp(@Arg('input') input: UserInputCreate) {
    const userRepository = Container.get(UserRepository);
    const authService = Container.get(AuthService);

    const hashedPassword = await authService.hashPassword(input.password);

    return userRepository.create({
      ...input,
      password: hashedPassword,
    });
  }
}

export default SignUpResolver;
