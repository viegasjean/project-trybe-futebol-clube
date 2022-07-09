import UserModel from '../database/models/UserModel';

interface User {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
}

export interface IUserRepository {
  findOne(data: Login): Promise<User>;
}

export default class UserRepository implements IUserRepository {
  constructor(private userModel = UserModel) {
    this.userModel = userModel;
  }

  async findOne(data: Login): Promise<User> {
    const entity = await this.userModel.findOne({ where: { email: data.email } });

    return entity as User;
  }
}
