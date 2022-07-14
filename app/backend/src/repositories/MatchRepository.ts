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
}
