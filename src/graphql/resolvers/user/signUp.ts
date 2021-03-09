import { Container } from 'typedi';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../types/User';
import UserInputCreate from '../../input/UserCreateInput';
import UserRepository from '../../../repositories/userRepository';

@Resolver()
class SignUpResolver {
  @Mutation(() => User, { description: 'Creates a new user on database' })
  async signUp(@Arg('input') input: UserInputCreate) {
    const userRepository = Container.get(UserRepository);
    return userRepository.create({ ...input });
  }
}

export default SignUpResolver;
