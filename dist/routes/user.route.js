"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const user_controller_1 = require("@controllers/user.controller");
const index_1 = require("@middlewares/index");
const user_service_1 = require("@services/user.service");
const express_1 = require("express");
class UserRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userService = new user_service_1.UserService();
        this.userController = new user_controller_1.UserController(this.userService);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/self', index_1.AuthMiddleware.authenticateToken, index_1.ValidationMiddleware.exceptionGuard(this.userController.getSelfData));
    }
}
exports.UserRoute = UserRoute;
//# sourceMappingURL=user.route.js.map