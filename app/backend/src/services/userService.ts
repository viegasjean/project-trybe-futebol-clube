import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { IUserRepository } from '../repositories/UserRepository';
import HttpException from '../exceptions/HttpException';

const secret = 'jwt_secret';

interface Login {
  email: string;
  password: string;
}

interface TokenPayload { id: string }

export interface IUserService {
  login(data: Login): Promise<{ token: string }>;
  validate(token: string | undefined): Promise<{ role: string }>
}

export default class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async login(data: Login): Promise<{ token: string }> {
    const { email, password } = data;
    if (!email || !password) {
      throw new HttpException(400, 'All fields must be filled');
    }

    const user = await this.userRepository.findOneByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const { id, role } = user;

    const token = jwt.sign({ id, role }, secret);

    return { token };
  }

  async validate(token: string | undefined): Promise<{ role: string }> {
    if (!token) throw new Error('Authorization header is required');
    const { id } = jwt.verify(token, secret) as TokenPayload;
    const { role } = await this.userRepository.findOneById(id);
    return { role };
  }
}
