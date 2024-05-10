import 'module-alias/register';
import { addAliases } from 'module-alias';
addAliases({
  "@": `${__dirname}/dist`,
  "@config": `${__dirname}/dist/config`,
  "@constants/*": `${__dirname}/dist/constants`,
  "@controllers/*": `${__dirname}/dist/controllers`,
  "@dtos/*": `${__dirname}/dist/dtos`,
  "@exceptions/*": `${__dirname}/dist/exceptions`,
  "@helpers/*": `${__dirname}/dist/helpers`,
  "@interfaces/*": `${__dirname}/dist/interfaces`,
  "@middlewares/*": `${__dirname}/dist/middlewares`,
  "@routes/*": `${__dirname}/dist/routes`,
  "@services/*": `${__dirname}/dist/services`,
  "@utils/*": `${__dirname}/dist/utils`
});

import express from 'express';
import cors from 'cors';
import { AppRouter } from './routes';
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS, VERSION } from './config';
import cookieParser from 'cookie-parser';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 4000;

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: ORIGIN,
        credentials: CREDENTIALS,
      }),
    );
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    this.app.get('/', (req, res) => {
      res.send('Server is running!');
    });

    const appRouter = new AppRouter();
    this.app.use(`/api/${VERSION}`, appRouter.router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}