import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Service } from 'typedi';
import config from '../config';
import { AuthUser } from '../context';

@Service()
export default class AuthService {
  async hashPassword(password: string, salt = 10) {
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  generateToken(payload: Record<string, unknown>) {
    return jwt.sign(payload, config.auth.secret, { expiresIn: config.auth.expiresIn });
  }

  decodeToken(token: string) {
    return jwt.verify(token, config.auth.secret) as AuthUser;
  }
}
