import { Router } from 'express';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/user.route';
import { AssessmentRoute } from './assessment.route';
import { TaskCategoryRoute } from './task.category.route';

export class AppRouter {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.use(new AuthRoute().router);
    this.router.use('/users', new UserRoute().router);
    this.router.use('/assessments', new AssessmentRoute().router);
    this.router.use('/task-categories', new TaskCategoryRoute().router);
  }
}
