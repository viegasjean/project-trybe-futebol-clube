import UserModel from '../database/models/UserModel';

interface User {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserRepository {
  findOneByEmail(email: string): Promise<User>;
  findOneById(id: string): Promise<User>;
}

export default class UserRepository implements IUserRepository {
  constructor(private userModel = UserModel) {
    this.userModel = userModel;
  }

  async findOneByEmail(email: string): Promise<User> {
    const entity = await this.userModel.findOne({ where: { email } });

    return entity as User;
  }

  async findOneById(id: string): Promise<User> {
    const entity = await this.userModel.findOne({ where: { id } });

    return entity as User;
  }
}
