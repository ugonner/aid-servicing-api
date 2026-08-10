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
exports.AidServiceController = void 0;
const common_1 = require("@nestjs/common");
const aid_service_service_1 = require("./aid-service.service");
const aid_service_dto_1 = require("../shared/dtos/aid-service.dto");
const user_decorator_1 = require("../shared/guards/decorators/user.decorator");
const apiresponse_1 = require("../shared/helpers/apiresponse");
const swagger_1 = require("@nestjs/swagger");
const all_exceptions_filter_1 = require("../shared/interceptors/all-exceptions.filter");
const jwt_guards_1 = require("../shared/guards/jwt.guards");
let AidServiceController = class AidServiceController {
    constructor(aidServiceService) {
        this.aidServiceService = aidServiceService;
    }
    async createAidService(payload, userId) {
        const res = await this.aidServiceService.createAidService(userId, payload);
        return apiresponse_1.ApiResponse.success("Aid service created", res);
    }
    async updateAidService(payload, action, userId) {
        action = action === "remove" ? "remove" : "add";
        const res = await this.aidServiceService.updateUserAidService(userId, Number(payload.id), action);
        return apiresponse_1.ApiResponse.success("Aid service updated", res);
    }
    async editAidService(aidServiceId, payload) {
        const res = await this.aidServiceService.updateAidService(aidServiceId, payload);
        return apiresponse_1.ApiResponse.success("Aid serice edited successfully", res);
    }
    async createAidServiceProfileApplication(payload, userId) {
        const res = await this.aidServiceService.createOrUpdateAidServiceProfile(userId, payload);
        return apiresponse_1.ApiResponse.success("Application created successfully", res);
    }
    async updateAidServiceProfileApplication(payload, userId) {
        const res = await this.aidServiceService.createOrUpdateAidServiceProfile(userId, payload);
        return apiresponse_1.ApiResponse.success("Application created successfully", res);
    }
    async updateAidServiceProfileApplicationStatus(payload, aidServiceProfileId, userId) {
        const res = await this.aidServiceService.updateUserAidServiceVerificationStatus(aidServiceProfileId, payload, userId);
        return apiresponse_1.ApiResponse.success("Application Verification updated successfully", res);
    }
    async getAidServiceProfiles(payload) {
        const res = await this.aidServiceService.getAidServiceProfiles(payload);
        return apiresponse_1.ApiResponse.success("Aid service profiles retrieved successfuly", res);
    }
    async getTags() {
        const res = await this.aidServiceService.getTags();
        return apiresponse_1.ApiResponse.success("Tags fetched successfully", res);
    }
    async getAidServices(payload) {
        const res = await this.aidServiceService.getAidServices(payload);
        return apiresponse_1.ApiResponse.success("Aid services retrieved successfuly", res);
    }
    async getAidServiceProfile(aidServiceProfileId) {
        const res = await this.aidServiceService.getAidServiceProfile(aidServiceProfileId);
        return apiresponse_1.ApiResponse.success("Aid service profile fetched successfully", res);
    }
    async getAidService(aidServiceId) {
        const res = await this.aidServiceService.getAidService(aidServiceId);
        return apiresponse_1.ApiResponse.success("Aid service fetched successfully", res);
    }
};
exports.AidServiceController = AidServiceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aid_service_dto_1.AidServiceDTO, String]),
    __metadata("design:returntype", Promise)
], AidServiceController.prototype, "createAidService", null);
__decorate([
    (0, common_1.Post)("update-aid-service/:userId/:action"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("action")),
    __param(2, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aid_service_dto_1.UpdateUserAidServiceDTO, String, String]),
    __metadata("design:returntype", Promise)
], AidServiceController.prototype, "updateAidService", null);
__decorate([
    (0, common_1.Put)("/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, aid_service_dto_1.AidServiceDTO]),
    __metadata("design:returntype", Promise)
], AidServiceController.prototype, "editAidService", null);
__decorate([
    (0, common_1.Post)("/profile/application"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aid_service_dto_1.AidServiceProfileApplicationDTO, String]),
    __metadata("design:returntype", Promise)
], AidServiceController.prototype, "createAidServiceProfileApplication", null);
__decorate([
    (0, common_1.Put)("/profile/application"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aid_service_dto_1.AidServiceProfileApplicationDTO, String]),
    __metadata("design:returntype", Promise)
], AidServiceController.prototype, "updateAidServiceProfileApplication", null);
__decorate([
    (0, common_1.Put)("/profile/status/:aidServiceProfileId"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("aidServiceProfileId", new common_1.ParseIntPipe())),
    __param(2, (0, user_decorator_1.User)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aid_service_dto_1.VerifyAidServiceProfileDTO, Number, String]),
    __metadata("design:returntype", Promise)
], AidServiceController.prototype, "updateAidServiceProfileApplicationStatus", null);
__decorate([
    (0, common_1.Get)("/profile"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aid_service_dto_1.QueryAidServiceProfileDTO]),
    __metadata("design:returntype", Promise)
], AidServiceController.prototype, "getAidServiceProfiles", null);
__decorate([
    (0, common_1.Get)("tag"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AidServiceController.prototype, "getTags", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aid_service_dto_1.QueryAidServiceDTO]),
    __metadata("design:returntype", Promise)
], AidServiceController.prototype, "getAidServices", null);
__decorate([
    (0, common_1.Get)("profile/:aidServiceProfileId"),
    __param(0, (0, common_1.Param)("aidServiceProfileId", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AidServiceController.prototype, "getAidServiceProfile", null);
__decorate([
    (0, common_1.Get)("/:aidServiceId"),
    __param(0, (0, common_1.Param)("aidServiceId", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AidServiceController.prototype, "getAidService", null);
exports.AidServiceController = AidServiceController = __decorate([
    (0, swagger_1.ApiTags)("aid-service"),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseFilters)(all_exceptions_filter_1.AllExceptionFilter),
    (0, common_1.Controller)('aid-service'),
    __metadata("design:paramtypes", [aid_service_service_1.AidServiceService])
], AidServiceController);
//# sourceMappingURL=aid-service.controller.js.map