import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU3ODIxNDMxfQ.dCC7HWucPFEPvr3AiDW6SCHhs6LxIWRysZKalHACuR0'
describe('User', () => {
  let chaiHttpResponse: Response;

  describe('POST user login', () => {
    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves({
          id: 1,
          username: 'Admin',
          role: 'admin',
          email: 'admin@admin.com',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
        } as User);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Success request to POST /login', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          email: "admin@admin.com",
          password: "secret_admin"
        })

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('token')
    });
  })

  describe('GET', () => {
    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves({
          id: 1,
          username: 'Admin',
          role: 'admin',
          email: 'admin@admin.com',
          password: 'secret_admin',
        } as User);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Success request to GET /login/validate', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', token)

      expect(chaiHttpResponse.status).to.be.equal(200);
      // expect(chaiHttpResponse.body).to.be.eql({ token: hash })
    });
  })
})
