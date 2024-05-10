"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentController = void 0;
const http_enum_1 = require("../constants/http.enum");
const response_helper_1 = require("../helpers/response.helper");
class AssessmentController {
    assessmentService;
    constructor(assessmentService) {
        this.assessmentService = assessmentService;
        this.getQuestions = this.getQuestions.bind(this);
        this.submitAssessmentTest = this.submitAssessmentTest.bind(this);
    }
    async getQuestions(req, res) {
        const questions = await this.assessmentService.getAssessmentQuestions(req.user.user_id);
        return response_helper_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Ok, 'Operation successful', questions);
    }
    async submitAssessmentTest(req, res) {
        const { tests, task_categories } = req.body;
        await this.assessmentService.submitAssessmentTest(req.user.user_id, tests, task_categories);
        return response_helper_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Ok, 'Assessment test submitted');
    }
}
exports.AssessmentController = AssessmentController;
//# sourceMappingURL=assessment.controller.js.map