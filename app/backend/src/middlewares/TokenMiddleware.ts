import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import * as jwt from 'jsonwebtoken';

const secret = 'jwt_secret';

export default class TokenMiddleware {
  validate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    try {
      if (token) jwt.verify(token, secret);
    } catch (error) {
      throw new HttpException(401, 'Token must be a valid token')
    }
    next();
  }
}