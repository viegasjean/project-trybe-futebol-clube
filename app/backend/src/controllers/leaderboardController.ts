import { NextFunction, Request, Response } from 'express';
import { ILeaderboardService } from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private service: ILeaderboardService,
  ) {
    this.service = service;
  }

  async leaderboardHome(req: Request, res: Response, next: NextFunction) {
    try {
      const Leaderboards = await this.service.leaderboardHome();
      return res.status(200).json(Leaderboards);
    } catch (error) {
      next(error);
    }
  }
}
