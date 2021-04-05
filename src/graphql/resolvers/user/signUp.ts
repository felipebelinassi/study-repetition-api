import { Container } from 'typedi';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { NormalContext } from '../../../context';
import { User } from '../../types/User';
import UserCreateInput from '../../input/UserCreateInput';
import UserRepository from '../../../repositories/userRepository';

@Resolver()
export default class SignUpResolver {
  @Mutation(() => User, { description: 'Creates a new user on database' })
  async signUp(@Ctx() ctx: NormalContext, @Arg('input') input: UserCreateInput) {
    ctx.logger.info('Signing up new user');
    const userRepository = Container.get(UserRepository);
    return userRepository.create({ ...input });
  }
}
