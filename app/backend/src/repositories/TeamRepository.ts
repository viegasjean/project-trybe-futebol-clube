import TeamModel from '../database/models/TeamModel';

export interface Team {
  id?: number;
  teamName: string;
}

export interface ITeamRepository {
  findAll(): Promise<Team[]>;
  findOne(id: string): Promise<Team>;
}

export default class TeamRepository implements ITeamRepository {
  constructor(private teamModel = TeamModel) {
    this.teamModel = teamModel;
  }

  async findAll(): Promise<Team[]> {
    const entities = await this.teamModel.findAll();

    return entities as Team[];
  }

  async findOne(id: string): Promise<Team> {
    const entity = await this.teamModel.findOne({ where: { id } });

    return entity as Team;
  }
}
