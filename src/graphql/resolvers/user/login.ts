import { Container } from 'typedi';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { LoginResponse } from '../../types/User';
import AuthService from '../../../services/authService';
import UserRepository from '../../../repositories/userRepository';

@Resolver()
class LoginResolver {
  @Mutation(() => LoginResponse, { description: 'Sign-in by email and password' })
  async login(
    @Arg('email') email: string,
      @Arg('password') password: string,
  ): Promise<LoginResponse> {
    const userRepository = Container.get(UserRepository);
    const authService = Container.get(AuthService);

    const user = await userRepository.getByEmail(email);

    if (!user || !(await authService.comparePasswords(password, user.password))) {
      throw new Error('User authentication failed');
    }

    const token = authService.generateToken({ ...user });

    return { 
      user,
      token,
    };
  }
}

export default LoginResolver;