import { HttpStatusCode } from '@constants/http.enum';
import { ResponseHelper } from '@helpers/response.helper';
import { RequestWithUser } from '@interfaces/auth.interface';
import { IApiBaseTaskCategory } from '@interfaces/task.category.interface';
import { TaskCategoryService } from '@services/task.category.service';
import { Response } from 'express';

export class TaskCategoryController {
  constructor(private taskCategoryService: TaskCategoryService) {
    this.getTaskCategories = this.getTaskCategories.bind(this);
    this.updateTaskCategories = this.updateTaskCategories.bind(this);
  }

  public async getTaskCategories(req: RequestWithUser, res: Response) {
    const categories = await this.taskCategoryService.getTaskCategoriesByUserId(
      req.user.user_id
    );

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Operation successful', 
      categories
    );
  }

  public async updateTaskCategories(req: RequestWithUser, res: Response) {
    const taskCategories: IApiBaseTaskCategory[] = req.body;

    const updatedCategories = await this.taskCategoryService.updateTaskCategoriesByUserId(
      req.user.user_id,
      taskCategories
    );

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Task Categories updated successfully', 
      updatedCategories
    );
  }
}
