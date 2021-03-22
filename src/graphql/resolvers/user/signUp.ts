import { Container } from 'typedi';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../types/User';
import UserCreateInput from '../../input/UserCreateInput';
import UserRepository from '../../../repositories/userRepository';

@Resolver()
export default class SignUpResolver {
  @Mutation(() => User, { description: 'Creates a new user on database' })
  async signUp(@Arg('input') input: UserCreateInput) {
    const userRepository = Container.get(UserRepository);
    return userRepository.create({ ...input });
  }
}
