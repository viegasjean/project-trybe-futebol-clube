import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';

import { Response } from 'superagent';
import { equal } from 'assert';

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
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Success request to GET /matches', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/matches')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.be.eql([
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
        }
      ])
    });
  })

  describe('POST match', () => {
    before(async () => {
      sinon
        .stub(Match, "create")
        .resolves(
          {
            id: 1,
            homeTeam: 16,
            homeTeamGoals: 1,
            awayTeam: 8,
            awayTeamGoals: 1,
            inProgress: false,
          } as Match);
    });

    after(()=>{
      (Match.create as sinon.SinonStub).restore();
    })

    it('Success request to POST /matches', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .send({
          homeTeam: 16,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2
        })

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.eql({
          "id": 1,
          "homeTeam": 16,
          "homeTeamGoals": 1,
          "awayTeam": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
        })
    });


  })


  describe('PATCH match', () => {
    before(async () => {
      sinon
        .stub(Match, "update")
        .resolves([1, []]);
    });

    after(()=>{
      (Match.update as sinon.SinonStub).restore();
    })

    it('Success request to PATCH /matches/2/finish', async () => {
      chaiHttpResponse = await chai.request(app)
        .patch('/matches/2/finish')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.eql({
          message: "Finished"
        })
    });

  })



})
