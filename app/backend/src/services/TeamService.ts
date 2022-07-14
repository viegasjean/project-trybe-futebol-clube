import { ITeamRepository, Team } from '../repositories/TeamRepository';

export interface ITeamService {
  getAll(): Promise<Team[]>;
  getById(id: string): Promise<Team>;
}

export default class TeamService implements ITeamService {
  constructor(private teamRepository: ITeamRepository) {
    this.teamRepository = teamRepository;
  }

  async getAll(): Promise<Team[]> {
    const teams = await this.teamRepository.findAll();
    return teams;
  }

  async getById(id: string): Promise<Team> {
    const team = await this.teamRepository.findOne(id);
    return team;
  }
}
