import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('User', () => {
  let chaiHttpResponse: Response;

  describe('POST', () => {
    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves({
          id: 1,
          username: 'mrbean',
          role: 'atacante',
          email: 'email@email.com',
          password: 'minhasenha123',
        } as User);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Success request to POST /login', async () => {
      chaiHttpResponse = await chai.request(app).post('/login')

      const hash = bcrypt.hashSync('minhasenha123', 8);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.eql({ token: hash })
    });
  })
})
