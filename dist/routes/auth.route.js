"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const auth_controller_1 = require("@controllers/auth.controller");
const index_1 = require("@middlewares/index");
const auth_service_1 = require("@services/auth.service");
const auth_dto_1 = require("dtos/auth.dto");
const express_1 = require("express");
class AuthRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authService = new auth_service_1.AuthService();
        this.authController = new auth_controller_1.AuthController(this.authService);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/login', index_1.ValidationMiddleware.validate(auth_dto_1.loginSchema), index_1.ValidationMiddleware.exceptionGuard(this.authController.login));
        this.router.post('/register', index_1.ValidationMiddleware.validate(auth_dto_1.registerSchema), index_1.ValidationMiddleware.exceptionGuard(this.authController.register));
        this.router.post('/refresh-token', index_1.ValidationMiddleware.exceptionGuard(this.authController.refreshToken));
        this.router.post('/logout', index_1.AuthMiddleware.authenticateToken, index_1.ValidationMiddleware.exceptionGuard(this.authController.logout));
    }
}
exports.AuthRoute = AuthRoute;
//# sourceMappingURL=auth.route.js.map