import MatchModel from '../database/models/MatchModel';
import TeamsModel from '../database/models/TeamModel';

export interface Match {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchRepository {
  findAll(): Promise<Match[]>;
  create(inputMatch: Omit<Match, 'inProgress'>): Promise<Match>;
  update(id: string): Promise<number>;
  updateGoals(id: string, homeTeamGoals: string, awayTeamGoals: string): Promise<number>;
}

export default class MatchRepository implements IMatchRepository {
  constructor(private matchModel = MatchModel) {
    this.matchModel = matchModel;
  }

  async findAll(): Promise<Match[]> {
    const entities = await this.matchModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return entities as Match[];
  }

  async create(inputMatch: Omit<Match, 'inProgress'>): Promise<Match> {
    const entity = await this.matchModel.create(inputMatch);
    return entity;
  }

  async update(id: string): Promise<number> {
    const [affectedRows] = await this.matchModel.update({inProgress: false}, { where: { id }})
    return affectedRows
  }

  async updateGoals(id: string, homeTeamGoals: string, awayTeamGoals: string): Promise<number> {
    const [affectedRows] = await this.matchModel
      .update({
        homeTeamGoals: Number(homeTeamGoals),
        awayTeamGoals: Number(awayTeamGoals)
      }, {
        where: { id }
      })
    return affectedRows
  }
}
