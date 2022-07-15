import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Maches', () => {
  let chaiHttpResponse: Response;

  describe('GET all maches', () => {
    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(
          [
            {
              "id": 1,
              "homeTeam": 16,
              "homeTeamGoals": 1,
              "awayTeam": 8,
              "awayTeamGoals": 1,
              "inProgress": false,
              "teamHome": {
                "teamName": "São Paulo"
              },
              "teamAway": {
                "teamName": "Grêmio"
              }
            },
          ] as Match[]);
    });

    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Success request to GET /matches', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/matches')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.all.keys([
        'id',
        'homeTeam',
        'homeTeamGoals',
        'awayTeam',
        'awayTeamGoals',
        'inProgress',
        'teamHome',
        'teamAway',
      ])
    });
  })

})
