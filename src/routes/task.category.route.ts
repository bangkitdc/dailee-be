import { TaskCategoryController } from '@controllers/task.category.controller';
import { updateTaskCategoriesSchema, validateAddTaskCategorySchema } from '@dtos/task.category.dto';
import { Routes } from '@interfaces/route.interface';
import { AuthMiddleware, ValidationMiddleware } from '@middlewares/index';
import { TaskCategoryService } from '@services/task.category.service';
import { Router } from 'express';

export class TaskCategoryRoute implements Routes {
  public router = Router();
  private taskCategoryService = new TaskCategoryService();
  private taskCategoryController = new TaskCategoryController(this.taskCategoryService);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/', 
      AuthMiddleware.authenticateToken, 
      ValidationMiddleware.exceptionGuard(this.taskCategoryController.getTaskCategories)
    );

    this.router.put(
      '/',
      AuthMiddleware.authenticateToken,
      ValidationMiddleware.validate(updateTaskCategoriesSchema),
      ValidationMiddleware.exceptionGuard(this.taskCategoryController.updateTaskCategories)
    );

    this.router.post(
      '/add-validate',
      AuthMiddleware.authenticateToken,
      ValidationMiddleware.validate(validateAddTaskCategorySchema),
      ValidationMiddleware.exceptionGuard(this.taskCategoryController.validateAddTaskCategory)
    )
  }
}
