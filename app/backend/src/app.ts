import * as express from 'express';
import UserController from './controllers/UserController';
import UserService from './services/userService';
import UserRepository from './repositories/UserRepository';
import HttpException from './exceptions/HttpException';

const userFactory = () => {
  const repository = new UserRepository();
  const service = new UserService(repository);
  const controller = new UserController(service);

  return controller;
};

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.login();

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
