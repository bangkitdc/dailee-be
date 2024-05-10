import { HttpStatusCode } from '@constants/http.enum';
import { ResponseHelper } from '@helpers/response.helper';
import { RequestWithUser } from '@interfaces/auth.interface';
import { IApiBaseTask } from '@interfaces/task.interface';
import { TaskService } from '@services/task.service';
import { Response } from 'express';

export class TaskController {
  constructor(private taskService: TaskService) {
    this.addOrUpdateTask = this.addOrUpdateTask.bind(this);
  }

  public async addOrUpdateTask(req: RequestWithUser, res: Response) {
    const taskData: IApiBaseTask = req.body;

    const updatedTask = await this.taskService.createOrUpdateTask(
      req.user.user_id,
      taskData
    );

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Operation successful', 
      updatedTask
    );
  }
}
