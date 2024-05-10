"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_enum_1 = require("../constants/http.enum");
const response_helper_1 = require("../helpers/response.helper");
class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
        this.getSelfData = this.getSelfData.bind(this);
    }
    async getSelfData(req, res) {
        const selfData = await this.userService.getUserSelfDataById(req.user.user_id);
        return response_helper_1.ResponseHelper.responseSuccess(res, http_enum_1.HttpStatusCode.Ok, 'Operation successful', selfData);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map