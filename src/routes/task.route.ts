import { TaskController } from '@controllers/task.controller';
import { addOrUpdateTaskCategoriesSchema } from '@dtos/task.category.dto';
import { Routes } from '@interfaces/route.interface';
import { AuthMiddleware, ValidationMiddleware } from '@middlewares/index';
import { TaskService } from '@services/task.service';
import { Router } from 'express';

export class TaskRoute implements Routes {
  public router = Router();
  private taskService = new TaskService();
  private taskController = new TaskController(this.taskService);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      '/', 
      AuthMiddleware.authenticateToken, 
      ValidationMiddleware.validate(addOrUpdateTaskCategoriesSchema),
      ValidationMiddleware.exceptionGuard(this.taskController.addOrUpdateTask)
    );
  }
}
