import * as jwt from 'jsonwebtoken';
import { IUserRepository } from '../repositories/UserRepository';

const secret = 'senhasupersecreta';

// interface User {
//   id?: number;
//   username: string;
//   role: string;
//   email: string;
//   password: string;
// }

interface Login {
  username: string;
  password: string;
}

export interface IUserService {
  login(data: Login): Promise<string>;
}

export default class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async login(data: Login): Promise<string> {
    const { username, password } = data;
    if (!username || !password) throw new Error('All fields must be filled');
    const token = jwt.sign(data, secret, { expiresIn: '7d', algorithm: 'HS256' });
    const user = await this.userRepository
      .findOne(data);
    if (user) return token;
    throw new Error('Could not find user');
  }
}
