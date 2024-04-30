import { Router } from 'express';
import { AuthRoute } from './auth.route';

export class AppRouter {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.use(new AuthRoute().router);
  }
}
