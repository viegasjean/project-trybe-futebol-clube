import * as express from 'express';
import UserController from './controllers/UserController';
import UserService from './services/userService';
import UserRepository from './repositories/UserRepository';
import HttpException from './exceptions/HttpException';

import TeamController from './controllers/TeamController';
import TeamService from './services/TeamService';
import TeamRepository from './repositories/TeamRepository';

import MatchController from './controllers/MatchController';
import MatchService from './services/MatchService';
import MatchRepository from './repositories/MatchRepository';

const userFactory = () => {
  const repository = new UserRepository();
  const service = new UserService(repository);
  const controller = new UserController(service);

  return controller;
};

const teamFactory = () => {
  const repository = new TeamRepository();
  const service = new TeamService(repository);
  const controller = new TeamController(service);

  return controller;
};

const matchFactory = () => {
  const repository = new MatchRepository();
  const service = new MatchService(repository);
  const controller = new MatchController(service);

  return controller;
};

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.login();

    this.validate();

    this.getAllTeams();

    this.getTeamById();

    this.getAllMatches();

    this.errorHandler();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private login() {
    this.app.post('/login', (req, res, next) => {
      userFactory().login(req, res, next);
    });
  }

  private validate() {
    this.app.get('/login/validate', (req, res, next) => {
      userFactory().validate(req, res, next);
    });
  }

  private getAllTeams() {
    this.app.get('/teams', (req, res, next) => {
      teamFactory().getAll(req, res, next);
    });
  }

  private getTeamById() {
    this.app.get('/teams/:id', (req, res, next) => {
      teamFactory().getById(req, res, next);
    });
  }

  private getAllMatches() {
    this.app.get('/matches', (req, res, next) => {
      matchFactory().getAll(req, res, next);
    });
  }

  private errorHandler() {
    this.app.use((
      err: HttpException,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      res.status(err.status || 500).json({ message: err.message });
    });
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
