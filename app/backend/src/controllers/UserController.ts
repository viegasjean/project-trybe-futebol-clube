import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../services/userService';

export default class UserController {
  constructor(
    private service: IUserService,
  ) {
    this.service = service;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.service.login(req.body);
      return res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
}
