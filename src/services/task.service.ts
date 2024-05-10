import { IApiBaseTask } from '@interfaces/task.interface';
import { PrismaClient, Task } from '@prisma/client';

export class TaskService {
  private taskModel = new PrismaClient().task;

  public async getTaskById(task_id: number): Promise<Task> {
    const task = await this.taskModel.findUnique({
      where: {
        task_id: task_id,
      },
    });

    return task;
  }

  public async createOrUpdateTask(user_id: number, taskData: IApiBaseTask): Promise<IApiBaseTask> {
    const newTaskData = {
      user_id: user_id,
      task_name: taskData.task_name,
      deadline: taskData.deadline,
      task_duration: taskData.task_duration,
      status: taskData.status,
      task_category_id: taskData.task_category_id
    };
    
    const updatedTask = await this.taskModel.upsert({
      where: {
        user_id: user_id,
        task_id: taskData.task_id
      },
      create: { ...newTaskData },
      update: { ...taskData }
    });

    return updatedTask;
  }
}
