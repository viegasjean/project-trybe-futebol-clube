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

  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const role = await this.service.validate(token);
      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }
}
