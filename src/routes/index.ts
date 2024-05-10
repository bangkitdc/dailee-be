import { Router } from 'express';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/user.route';
import { AssessmentRoute } from '@routes/assessment.route';
import { TaskCategoryRoute } from '@routes/task.category.route';
import { TaskRoute } from '@routes/task.route';

export class AppRouter {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.use(new AuthRoute().router);
    this.router.use('/users', new UserRoute().router);
    this.router.use('/assessments', new AssessmentRoute().router);
    this.router.use('/task-categories', new TaskCategoryRoute().router);
    this.router.use('/tasks', new TaskRoute().router);
  }
}
