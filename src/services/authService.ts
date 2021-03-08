import bcrypt from 'bcrypt';
import { Service } from 'typedi';

@Service()
export default class AuthService {
  async hashPassword(password: string, salt = 10) {
    return bcrypt.hash(password, salt);
  }
}
 
