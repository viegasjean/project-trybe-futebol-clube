import { IMatchRepository, Match } from '../repositories/MatchRepository';

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
    const match = await this.matchRepository.create(inputMatch);
    return match;
  }

  async finish(id: string): Promise<string> {
    const affectedRows = await this.matchRepository.update(id);
    if (affectedRows === 0) throw new Error('Team not found')
    return "Finished"
  }
}
