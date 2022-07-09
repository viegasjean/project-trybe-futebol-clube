import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { IUserRepository } from '../repositories/UserRepository';
import HttpException from '../exceptions/HttpException';

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
  login(data: Login): Promise<{ token: string }>;
}

export default class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async login(data: Login): Promise<{ token: string }> {
    const { username, password } = data;
    if (!username || !password) {
      throw new HttpException(400, 'All fields must be filled');
    }

    const user = await this.userRepository.findOne(data);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const token = jwt.sign(data, secret, { expiresIn: '7d', algorithm: 'HS256' });
    return { token };
  }
}
