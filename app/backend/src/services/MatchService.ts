import { IMatchRepository, Match } from '../repositories/MatchRepository';

export interface IMatchService {
  getAll(): Promise<Match[]>;
}

export default class MatchService implements IMatchService {
  constructor(private matchRepository: IMatchRepository) {
    this.matchRepository = matchRepository;
  }

  async getAll(): Promise<Match[]> {
    const matchs = await this.matchRepository.findAll();
    return matchs;
  }
}
