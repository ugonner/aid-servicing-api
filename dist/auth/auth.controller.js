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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_dto_1 = require("../shared/dtos/user.dto");
const apiresponse_1 = require("../shared/helpers/apiresponse");
const auth_dto_1 = require("../shared/dtos/auth.dto");
const swagger_1 = require("@nestjs/swagger");
const all_exceptions_filter_1 = require("../shared/interceptors/all-exceptions.filter");
const jwt_guards_1 = require("../shared/guards/jwt.guards");
const role_dto_1 = require("../shared/dtos/role.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async registerAdminAccount(payload, req) {
        const res = await this.authService.createAccount(payload);
        return apiresponse_1.ApiResponse.success('User Account Created Successfully', res);
    }
    async login(payload, req, ip) {
        const refreshTokenData = {
            userAgent: req.headers['user-agent'],
            ipAddress: ip,
        };
        const user = await this.authService.login(payload, refreshTokenData);
        return apiresponse_1.ApiResponse.success('Login successful', user);
    }
    async verifyAccount(payload, req, ip) {
        const refreshTokenData = {
            userAgent: req.headers['user-agent'],
            ipAddress: ip,
        };
        const user = await this.authService.verifyAccount(payload, refreshTokenData);
        return apiresponse_1.ApiResponse.success('Verification successsful', user);
    }
    async forgotPassword(payload) {
        const user = await this.authService.requestResetPassword(payload);
        return apiresponse_1.ApiResponse.success('Forgot Password Link Sent', user);
    }
    async requestResetPassword(payload) {
        const user = await this.authService.requestResetPassword(payload);
        return apiresponse_1.ApiResponse.success('Forgot Password Link Sent', user);
    }
    async resetPassword(payload) {
        const user = await this.authService.resetPassword(payload);
        return apiresponse_1.ApiResponse.success('Password Reset Successfull', user);
    }
    async resendOtp(payload) {
        const user = await this.authService.resendOtp(payload);
        return apiresponse_1.ApiResponse.success('Successfully sent verification code', user);
    }
    async requestOtp(payload) {
        const user = await this.authService.resendOtp(payload);
        return apiresponse_1.ApiResponse.success('Successfully sent verification code', user);
    }
    async createRole(payload) {
        const res = await this.authService.createRole(payload);
        return apiresponse_1.ApiResponse.success("Role created successfully", res);
    }
    async updateRole(payload, roleId) {
        const res = await this.authService.updateRole(roleId, payload);
        return apiresponse_1.ApiResponse.success("Role updated successfully", res);
    }
    async assignUserRole(userId, roleId) {
        const res = await this.authService.assignRole(userId, roleId);
        return apiresponse_1.ApiResponse.success("Role assigned successfully", res);
    }
    async getHostIp() {
        const ipAddress = await this.authService.getIP();
        return apiresponse_1.ApiResponse.success("IP Address retrieved", { ipAddress });
    }
    async getAuthUsers(payload) {
        const res = await this.authService.getAuthUsers(payload);
        return apiresponse_1.ApiResponse.success("Users fetched successfully", res);
    }
    async getRoles() {
        const res = await this.authService.getRoles();
        return apiresponse_1.ApiResponse.success("Users fetched successfully", res);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiCreatedResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserProfileDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAdminAccount", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDTO, Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.OtpAuthDTO, Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyAccount", null);
__decorate([
    (0, common_1.Post)('/forgot-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.OtpAuthDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('/request-reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.OtpAuthDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestResetPassword", null);
__decorate([
    (0, common_1.Post)('/reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.OtpAuthDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('/resend-otp'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.OtpAuthDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendOtp", null);
__decorate([
    (0, common_1.Post)('/request-otp'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.OtpAuthDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestOtp", null);
__decorate([
    (0, common_1.Post)("role"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createRole", null);
__decorate([
    (0, common_1.Put)("role/:roleId"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("roleId", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDTO, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Put)("/:userId/role/:roleId/assign"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Param)("roleId", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "assignUserRole", null);
__decorate([
    (0, common_1.Get)("/host-ip"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getHostIp", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.QueryAuthDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAuthUsers", null);
__decorate([
    (0, common_1.Get)("role"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getRoles", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.UseFilters)(all_exceptions_filter_1.AllExceptionFilter),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map