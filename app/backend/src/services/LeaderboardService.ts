import { ITeamRepository, Team } from '../repositories/TeamRepository';
import { IMatchRepository, Match } from '../repositories/MatchRepository';

interface leaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export interface ILeaderboardService {
  leaderboardHome(): Promise<leaderboard[]>;
  leaderboardAway(): Promise<leaderboard[]>;
}

export default class LeaderboardService implements ILeaderboardService {
  constructor(
    private teamRepository: ITeamRepository,
    private matchRepository: IMatchRepository,
  ) {
    this.teamRepository = teamRepository;
    this.matchRepository = matchRepository;
  }

  async leaderboardHome(): Promise<leaderboard[]> {
    const teams = await this.teamRepository.findAll();
    const match = await this.matchRepository.findAll();

    const leaderboard = teams
      .map((team) => {
        const teamStatistic = {
          name: team.teamName,
          totalPoints: 0,
          totalGames: 0,
          totalVictories: 0,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: 0,
          goalsOwn: 0,
          goalsBalance: 0,
          efficiency: ''
        }

        match
          .filter((match) => match.homeTeam === team.id )
          .filter((match) => match.inProgress === false)
          .forEach((match) => {
            teamStatistic.totalGames += 1
            teamStatistic.goalsFavor += match.homeTeamGoals
            teamStatistic.goalsOwn += match.awayTeamGoals
            teamStatistic.goalsBalance = teamStatistic.goalsFavor - teamStatistic.goalsOwn

            if (match.homeTeamGoals > match.awayTeamGoals) {
              teamStatistic.totalPoints += 3
              teamStatistic.totalVictories +=1
            }

            if (match.homeTeamGoals < match.awayTeamGoals) {
              teamStatistic.totalLosses +=1
            }

            if (match.homeTeamGoals === match.awayTeamGoals) {
              console.log({ team: team.teamName, homegoals: match.homeTeamGoals, awaygoals: match.awayTeamGoals})
              teamStatistic.totalPoints += 1
              teamStatistic.totalDraws += 1
            }

          })
        teamStatistic.efficiency = (teamStatistic.totalPoints / (teamStatistic.totalGames * 3) * 100).toFixed(2)

        return teamStatistic
    })
    .sort((a, b) => (
      b.totalPoints - a.totalPoints ||
      b.totalVictories - a.totalVictories ||
      b.goalsBalance - a.goalsBalance ||
      b.goalsFavor - a.goalsFavor ||
      b.goalsOwn - a.goalsOwn
      ))

    return leaderboard;
  }

  async leaderboardAway(): Promise<leaderboard[]> {
    const teams = await this.teamRepository.findAll();
    const match = await this.matchRepository.findAll();

    const leaderboard = teams
      .map((team) => {
        const teamStatistic = {
          name: team.teamName,
          totalPoints: 0,
          totalGames: 0,
          totalVictories: 0,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: 0,
          goalsOwn: 0,
          goalsBalance: 0,
          efficiency: ''
        }

        match
          .filter((match) => match.awayTeam === team.id )
          .filter((match) => match.inProgress === false)
          .forEach((match) => {
            teamStatistic.totalGames += 1
            teamStatistic.goalsFavor += match.awayTeamGoals
            teamStatistic.goalsOwn += match.homeTeamGoals
            teamStatistic.goalsBalance = teamStatistic.goalsFavor - teamStatistic.goalsOwn

            if (match.awayTeamGoals > match.homeTeamGoals) {
              teamStatistic.totalPoints += 3
              teamStatistic.totalVictories +=1
            }

            if (match.awayTeamGoals < match.homeTeamGoals) {
              teamStatistic.totalLosses +=1
            }

            if (match.awayTeamGoals === match.homeTeamGoals) {
              teamStatistic.totalPoints += 1
              teamStatistic.totalDraws += 1
            }

          })
        teamStatistic.efficiency = (teamStatistic.totalPoints / (teamStatistic.totalGames * 3) * 100).toFixed(2)

        return teamStatistic
    })
    .sort((a, b) => (
      b.totalPoints - a.totalPoints ||
      b.totalVictories - a.totalVictories ||
      b.goalsBalance - a.goalsBalance ||
      b.goalsFavor - a.goalsFavor ||
      b.goalsOwn - a.goalsOwn
      ))

    return leaderboard;
  }
}
