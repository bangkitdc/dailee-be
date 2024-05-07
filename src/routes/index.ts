import { Router } from 'express';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/user.route';

export class AppRouter {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.use(new AuthRoute().router);
    this.router.use(new UserRoute().router);
  }
}
