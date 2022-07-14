import { ITeamRepository, Team } from '../repositories/TeamRepository';

export interface ITeamService {
  getAll(): Promise<Team[]>;
}

export default class TeamService implements ITeamService {
  constructor(private teamRepository: ITeamRepository) {
    this.teamRepository = teamRepository;
  }

  async getAll(): Promise<Team[]> {
    const teams = await this.teamRepository.findAll();
    return teams;
  }
}
