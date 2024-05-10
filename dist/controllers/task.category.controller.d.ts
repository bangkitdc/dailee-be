import { RequestWithUser } from '@interfaces/auth.interface';
import { TaskCategoryService } from '@services/task.category.service';
import { Response } from 'express';
export declare class TaskCategoryController {
    private taskCategoryService;
    constructor(taskCategoryService: TaskCategoryService);
    getTaskCategories(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    addOrUpdateTaskCategories(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    validateAddTaskCategory(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
}
