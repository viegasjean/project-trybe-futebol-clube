import TeamModel from '../database/models/TeamModel';

export interface Team {
  id?: number;
  teamName: string;
}

export interface ITeamRepository {
  findAll(): Promise<Team[]>;
}

export default class TeamRepository implements ITeamRepository {
  constructor(private teamModel = TeamModel) {
    this.teamModel = teamModel;
  }

  async findAll(): Promise<Team[]> {
    const entities = await this.teamModel.findAll();

    return entities;
  }
}
