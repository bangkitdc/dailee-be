"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoute = void 0;
const task_controller_1 = require("../controllers/task.controller");
const task_dto_1 = require("../dtos/task.dto");
const index_1 = require("../middlewares/index");
const task_service_1 = require("../services/task.service");
const express_1 = require("express");
class TaskRoute {
    router = (0, express_1.Router)();
    taskService = new task_service_1.TaskService();
    taskController = new task_controller_1.TaskController(this.taskService);
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.put('/', index_1.AuthMiddleware.authenticateToken, index_1.ValidationMiddleware.validate(task_dto_1.addOrUpdateTaskSchema), index_1.ValidationMiddleware.exceptionGuard(this.taskController.addOrUpdateTask));
        this.router.get('/completed', index_1.AuthMiddleware.authenticateToken, index_1.ValidationMiddleware.exceptionGuard(this.taskController.getCompletedTasks));
        this.router.get('/task/:date', index_1.AuthMiddleware.authenticateToken, index_1.ValidationMiddleware.validate(task_dto_1.getTaskSchema), index_1.ValidationMiddleware.exceptionGuard(this.taskController.getTask));
        this.router.patch('/:task_id', index_1.AuthMiddleware.authenticateToken, index_1.ValidationMiddleware.validate(task_dto_1.checkTaskSchema), index_1.ValidationMiddleware.exceptionGuard(this.taskController.checkTask));
    }
}
exports.TaskRoute = TaskRoute;
//# sourceMappingURL=task.route.js.map