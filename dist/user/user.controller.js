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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_decorator_1 = require("../shared/guards/decorators/user.decorator");
const apiresponse_1 = require("../shared/helpers/apiresponse");
const jwt_guards_1 = require("../shared/guards/jwt.guards");
const auth_entity_1 = require("../entities/auth.entity");
const user_dto_1 = require("../shared/dtos/user.dto");
const swagger_1 = require("@nestjs/swagger");
const all_exceptions_filter_1 = require("../shared/interceptors/all-exceptions.filter");
const cluster_dto_1 = require("./dtos/cluster.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async updateUser(payload, user, queryPayload) {
        const userId = queryPayload.userId || user?.userId;
        const res = await this.userService.updateUser(userId, payload);
        return apiresponse_1.ApiResponse.success("user updated successfully", res);
    }
    async createCluster(payload) {
        const res = await this.userService.createCluster(payload);
        return apiresponse_1.ApiResponse.success("cluster created successfully", res);
    }
    async updateCluster(payload, clusterId) {
        const res = await this.userService.updateCluster(clusterId, payload);
        return apiresponse_1.ApiResponse.success("cluster updated successfully", res);
    }
    async manageUserCluster(payload, userId, paramUserId) {
        userId = paramUserId || userId;
        const res = await this.userService.manageUserClusters(userId, payload, payload.options);
        return apiresponse_1.ApiResponse.success("cluster updated successfully", res);
    }
    async getClusters() {
        const res = await this.userService.getClusters();
        return apiresponse_1.ApiResponse.success("clusters fetched successfully", res);
    }
    async getUsers(payload) {
        const res = await this.userService.getUsers(payload);
        return apiresponse_1.ApiResponse.success("users fetched successfully", res);
    }
    async getUser(userId) {
        const res = await this.userService.getUser(userId);
        return apiresponse_1.ApiResponse.success("User fetched successfully", res);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateProfileDTO,
        auth_entity_1.Auth, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)("cluster"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cluster_dto_1.ClusterDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createCluster", null);
__decorate([
    (0, common_1.Put)("cluster/:id"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cluster_dto_1.ClusterDTO, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateCluster", null);
__decorate([
    (0, common_1.Post)("/:userId/cluster/manage"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)("userId")),
    __param(2, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cluster_dto_1.ManageUserClustersDTO, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "manageUserCluster", null);
__decorate([
    (0, common_1.Get)("cluster"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getClusters", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.QueryUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)("/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)("user"),
    (0, common_1.UseFilters)(all_exceptions_filter_1.AllExceptionFilter),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map