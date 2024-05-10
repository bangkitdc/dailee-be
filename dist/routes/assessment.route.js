"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentRoute = void 0;
const assessment_controller_1 = require("@controllers/assessment.controller");
const assessment_dto_1 = require("@dtos/assessment.dto");
const index_1 = require("@middlewares/index");
const assessment_service_1 = require("@services/assessment.service");
const express_1 = require("express");
class AssessmentRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.assessmentService = new assessment_service_1.AssessmentService();
        this.assessmentController = new assessment_controller_1.AssessmentController(this.assessmentService);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/questions', index_1.AuthMiddleware.authenticateToken, index_1.ValidationMiddleware.exceptionGuard(this.assessmentController.getQuestions));
        this.router.post('/submit', index_1.AuthMiddleware.authenticateToken, index_1.ValidationMiddleware.validate(assessment_dto_1.submitAssessmentTestSchema), index_1.ValidationMiddleware.exceptionGuard(this.assessmentController.submitAssessmentTest));
    }
}
exports.AssessmentRoute = AssessmentRoute;
//# sourceMappingURL=assessment.route.js.map