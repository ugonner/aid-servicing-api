"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallController = void 0;
const common_1 = require("@nestjs/common");
const apiresponse_1 = require("../shared/helpers/apiresponse");
const swagger_1 = require("@nestjs/swagger");
const all_exceptions_filter_1 = require("../shared/interceptors/all-exceptions.filter");
const call_service_1 = require("./call.service");
const call_dto_1 = require("../shared/dtos/call.dto");
const user_decorator_1 = require("../shared/guards/decorators/user.decorator");
const jwt_guards_1 = require("../shared/guards/jwt.guards");
let CallController = class CallController {
    constructor(callRoomService) {
        this.callRoomService = callRoomService;
    }
    async createCallRoom(payload) {
        const res = await this.callRoomService.createPlainCall(payload);
        return apiresponse_1.ApiResponse.success("call recorded", res);
    }
    async createAidServiceCallRoom(payload) {
        const res = await this.callRoomService.createAidServiceCall(payload);
        return apiresponse_1.ApiResponse.success("call recorded", res);
    }
    async getUserCallRoom(userId) {
        const res = await this.callRoomService.getUserCalls(userId);
        return apiresponse_1.ApiResponse.success("user calls fetched successfuly", res);
    }
    async getCallRoom(payload) {
        const res = await this.callRoomService.getCallRooms(payload);
        return apiresponse_1.ApiResponse.success("Call rooms fetched successfuly", res);
    }
};
exports.CallController = CallController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [call_dto_1.CallRoomDTO]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "createCallRoom", null);
__decorate([
    (0, common_1.Post)("/aid-service"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [call_dto_1.CallRoomDTO]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "createAidServiceCallRoom", null);
__decorate([
    (0, common_1.Get)("/user"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, user_decorator_1.User)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "getUserCallRoom", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [call_dto_1.QueryCallRoomDTO]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "getCallRoom", null);
exports.CallController = CallController = __decorate([
    (0, swagger_1.ApiTags)("call-room"),
    (0, common_1.UseFilters)(all_exceptions_filter_1.AllExceptionFilter),
    (0, common_1.Controller)('call-room'),
    __metadata("design:paramtypes", [call_service_1.CallService])
], CallController);
//# sourceMappingURL=call.controller.js.map