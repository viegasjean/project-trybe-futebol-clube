import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  let chaiHttpResponse: Response;

  describe('GET leaderboard', () => {
    before(async () => {
      sinon
        .stub(Team, "findAll")
        .resolves(
          [
            {
              id: 1,
              teamName: "Avaí/Kindermann"
            },
            {
              id: 2,
              teamName: "Bahia"
            }
          ] as Team[]);

          sinon
          .stub(Match, "findAll")
          .resolves(
            [
              {
                id: 1,
                homeTeam: 16,
                homeTeamGoals: 1,
                awayTeam: 8,
                awayTeamGoals: 1,
                inProgress: false,
                teamHome: {
                  teamName: "São Paulo"
                },
                teamAway: {
                  teamName: "Grêmio"
                }
              },
            ] as Match[]);
    });

    after(()=>{
      (Team.findAll as sinon.SinonStub).restore();
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Success request to GET /leaderboard', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/leaderboard')

      expect(chaiHttpResponse.status).to.be.equal(200);
      // expect(chaiHttpResponse.body).to.have.property('token')
    });

    it('Success request to GET /leaderboard/home', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/leaderboard/home')

      expect(chaiHttpResponse.status).to.be.equal(200);
      // expect(chaiHttpResponse.body).to.have.property('token')
    });

    it('Success request to GET /leaderboard/away', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/leaderboard/away')

      expect(chaiHttpResponse.status).to.be.equal(200);
      // expect(chaiHttpResponse.body).to.have.property('token')
    });
  })

})
