import bcrypt from 'bcrypt';

interface AuthService {
  hashPassword: (password: string, salt?: number) => Promise<string>;
}

const authService = (): AuthService => {
  const hashPassword = async (password: string, salt = 10) => bcrypt.hash(password, salt);

  return {
    hashPassword,
  };
};

export default authService;
