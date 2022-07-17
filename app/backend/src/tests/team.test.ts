import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team', () => {
  let chaiHttpResponse: Response;

  describe('GET all teams', () => {
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
    });

    after(()=>{
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('Success request to GET /teams', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/teams')

      expect(chaiHttpResponse.status).to.be.equal(200);
      // expect(chaiHttpResponse.body).to.have.property('token')
    });
  })

  describe('GET teams by id', () => {
    before(async () => {
      sinon
        .stub(Team, "findOne")
        .resolves({
          id: 5,
          teamName: "Cruzeiro"
        } as Team);
    });

    after(()=>{
      (Team.findOne as sinon.SinonStub).restore();
    })

    it('Success request to GET /teams/5', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/5')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.eql({
        id: 5,
        teamName: "Cruzeiro"
      })
    });
  })
})
