import { NextFunction, Request, Response } from 'express';
import { ITeamService } from '../services/TeamService';

export default class TeamController {
  constructor(
    private service: ITeamService,
  ) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.service.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const team = await this.service.getById(id);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
