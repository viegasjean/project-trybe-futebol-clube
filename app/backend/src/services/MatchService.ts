import { IMatchRepository, Match } from '../repositories/MatchRepository';
import HttpException from '../exceptions/HttpException';

export interface IMatchService {
  getAll(): Promise<Match[]>;
  add(inputMatch: Omit<Match, 'inProgress'>): Promise<Match>;
  finish(id: string): Promise<string>;
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
    if (inputMatch.awayTeam === inputMatch.homeTeam) throw new HttpException(401, 'It is not possible to create a match with two equal teams')
    const match = await this.matchRepository.create(inputMatch);
    return match;
  }

  async finish(id: string): Promise<string> {
    const affectedRows = await this.matchRepository.update(id);
    if (affectedRows === 0) throw new Error('Team not found')
    return "Finished"
  }
}
