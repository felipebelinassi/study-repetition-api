import { Container } from 'typedi';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { ApolloError } from 'apollo-server-errors';
import { NormalContext } from '../../../context';
import { LoginResponse } from '../../types/User';
import AuthService from '../../../services/authService';
import UserRepository from '../../../repositories/userRepository';

@Resolver()
export default class LoginResolver {
  @Mutation(() => LoginResponse, { description: 'Sign-in by email and password' })
  async login(
    @Ctx() ctx: NormalContext,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    ctx.logger.info('User login');
    const userRepository = Container.get(UserRepository);
    const authService = Container.get(AuthService);

    const user = await userRepository.getByEmail(email);

    if (!user || !(await authService.comparePasswords(password, user.password))) {
      ctx.logger.error('User authentication failed');
      throw new ApolloError('AUTHENTICATION_FAILED');
    }

    const { id, email: userEmail, username } = user;
    const token = authService.generateToken({ id, email: userEmail, username });

    return {
      user,
      token,
    };
  }
}
