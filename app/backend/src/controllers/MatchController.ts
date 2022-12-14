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
    const inputMatch = req.body
    try {
      const match = await this.service.add(inputMatch);
      return res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  }

  async finish(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const message = await this.service.finish(id)
      return res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  async updateGoals(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    try {
      const ok = await this.service.updateGoals(id, homeTeamGoals, awayTeamGoals)
      return res.status(200).json({ok})
    } catch (error) {
      next(error);
    }
  }
}
