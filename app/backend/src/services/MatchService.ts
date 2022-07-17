import { IMatchRepository, Match } from '../repositories/MatchRepository';
import TeamRepository from '../repositories/TeamRepository';
import HttpException from '../exceptions/HttpException';

import * as jwt from 'jsonwebtoken';

const secret = 'jwt_secret';

export interface IMatchService {
  getAll(): Promise<Match[]>;
  add(inputMatch: Omit<Match, 'inProgress'>): Promise<Match>;
  finish(id: string): Promise<string>;
  updateGoals(id: string, homeTeamGoals: string, awayTeamGoals: string): Promise<boolean>;
}

export default class MatchService implements IMatchService {
  constructor(private matchRepository: IMatchRepository) {
    this.matchRepository = matchRepository;
  }

  async getAll(): Promise<Match[]> {
    const matchs = await this.matchRepository.findAll();
    return matchs;
  }

  async add(inputMatch: Omit<Match, 'inProgress'>): Promise<Match>{
    const { awayTeam, homeTeam } = inputMatch
    if (awayTeam === homeTeam) throw new HttpException(401, 'It is not possible to create a match with two equal teams')

    const teamRepository = new TeamRepository
    if (
      !await teamRepository.findOne(awayTeam.toString()) || !await teamRepository.findOne(homeTeam.toString())
    ) {
      throw new HttpException(404, 'There is no team with such id!')
    }

    const match = await this.matchRepository.create(inputMatch);
    return match;
  }

  async finish(id: string): Promise<string> {
    const affectedRows = await this.matchRepository.update(id);
    if (affectedRows === 0) throw new Error('Team not found')
    return "Finished"
  }

  async updateGoals(id: string, homeTeamGoals: string, awayTeamGoals: string): Promise<boolean> {
    const affectedRows = await this.matchRepository.updateGoals(id, homeTeamGoals, awayTeamGoals)
    if (affectedRows === 0) throw new Error('Error in update')
    return true
  }
}
