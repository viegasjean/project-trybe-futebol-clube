import { NextFunction, Request, Response } from 'express';
import { IMatchService } from '../services/MatchService';

export default class MatchController {
  constructor(
    private service: IMatchService,
  ) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const matchs = await this.service.getAll();
      return res.status(200).json(matchs);
    } catch (error) {
      next(error);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const match = await this.service.add(req.body)
      return res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  }
}
