"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCategoryRoute = void 0;
const task_category_controller_1 = require("@controllers/task.category.controller");
const task_category_dto_1 = require("@dtos/task.category.dto");
const index_1 = require("@middlewares/index");
const task_category_service_1 = require("@services/task.category.service");
const express_1 = require("express");
class TaskCategoryRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.taskCategoryService = new task_category_service_1.TaskCategoryService();
        this.taskCategoryController = new task_category_controller_1.TaskCategoryController(this.taskCategoryService);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', index_1.AuthMiddleware.authenticateToken, index_1.ValidationMiddleware.exceptionGuard(this.taskCategoryController.getTaskCategories));
        this.router.put('/', index_1.AuthMiddleware.authenticateToken, index_1.ValidationMiddleware.validate(task_category_dto_1.addOrUpdateTaskCategoriesSchema), index_1.ValidationMiddleware.exceptionGuard(this.taskCategoryController.addOrUpdateTaskCategories));
        this.router.post('/add-validate', index_1.AuthMiddleware.authenticateToken, index_1.ValidationMiddleware.validate(task_category_dto_1.validateAddTaskCategorySchema), index_1.ValidationMiddleware.exceptionGuard(this.taskCategoryController.validateAddTaskCategory));
    }
}
exports.TaskCategoryRoute = TaskCategoryRoute;
//# sourceMappingURL=task.category.route.js.map