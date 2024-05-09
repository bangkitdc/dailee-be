import { IApiBaseTaskCategory } from '@interfaces/task.category.interface';
import { PrismaClient } from '@prisma/client';

const createTaskCategorySeeds = (user_id: number) => {
  const taskCategorySeeds = [
    { task_category_name: 'Document', user_id: user_id, priority: 1 },
    { task_category_name: 'Creativity', user_id: user_id, priority: 2 },
    { task_category_name: 'Extracurricular', user_id: user_id, priority: 3 },
    { task_category_name: 'Math', user_id: user_id, priority: 4 },
  ];

  return taskCategorySeeds;
}

export class TaskCategoryService {
  private taskCategoryModel = new PrismaClient().taskCategory;

  public async createInitialTaskCategories(user_id: number): Promise<void> {
    await this.taskCategoryModel.createMany({
      data: createTaskCategorySeeds(user_id)
    });
  }

  public async getTaskCategoriesByUserId(user_id: number): Promise<IApiBaseTaskCategory[]> {
    const categories = await this.taskCategoryModel.findMany({
      where: { 
        user_id: user_id 
      },
      select: {
        task_category_id: true,
        task_category_name: true,
      },
      orderBy: {
        priority: "asc"
      }
    });

    return categories;
  }

  public async updateTaskCategoriesByUserId(user_id: number, categories: IApiBaseTaskCategory[]): Promise<IApiBaseTaskCategory[]> {
    const updatedCategories: IApiBaseTaskCategory[] = [];
    
    for (const [index, category] of categories.entries()) {
      const updatedCategory = await this.taskCategoryModel.update({
        where: {
          user_id: user_id,
          task_category_id: category.task_category_id
        },
        data: {
          priority: index + 1
        },
        select: {
          task_category_id: true,
          task_category_name: true
        }
      });

      updatedCategories.push(updatedCategory);
    }

    return updatedCategories;
  }
}
