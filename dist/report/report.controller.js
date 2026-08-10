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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guards_1 = require("../shared/guards/jwt.guards");
const user_decorator_1 = require("../shared/guards/decorators/user.decorator");
const review_dto_1 = require("../shared/dtos/review.dto");
const apiresponse_1 = require("../shared/helpers/apiresponse");
const report_service_1 = require("./report.service");
const swagger_1 = require("@nestjs/swagger");
const report_sto_1 = require("./dtos/report.sto");
const query_request_dto_1 = require("../shared/dtos/query-request.dto");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async createReview(userId, payload) {
        const res = await this.reportService.createReport(payload, userId);
        return apiresponse_1.ApiResponse.success("review created successfully", res);
    }
    async commentReport(payload, userId) {
        const res = await this.reportService.updateReport(payload, userId);
        return apiresponse_1.ApiResponse.success("Report commented successfully", res);
    }
    async commentReportComment(payload, userId, reportId) {
        const res = await this.reportService.commentReport(reportId, userId, payload);
        return apiresponse_1.ApiResponse.success("Report comment recorded", res);
    }
    async resolveReportComment(payload, userId, reportId) {
        const res = await this.reportService.resolveReport(reportId, userId, payload);
        return apiresponse_1.ApiResponse.success("Repprt resolutionrecorded", res);
    }
    async getReports(payload) {
        const res = await this.reportService.getReports(payload);
        return apiresponse_1.ApiResponse.success("reports fetched successfully", res);
    }
    async getReportComment(reportId, payload) {
        const res = await this.reportService.getReportComments(reportId, payload);
        return apiresponse_1.ApiResponse.success("Report comments fetched successfully", res);
    }
    async getReport(reportId) {
        const res = await this.reportService.getReport(reportId);
        return apiresponse_1.ApiResponse.success("Report fetched successfully", res);
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, user_decorator_1.User)("userId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_dto_1.ReviewAndRatingDTO]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "createReview", null);
__decorate([
    (0, common_1.Put)("update"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_dto_1.UpdateReportDTO, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "commentReport", null);
__decorate([
    (0, common_1.Post)("/:reportId/comment"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)("userId")),
    __param(2, (0, common_1.Param)("reportId", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_sto_1.ReportCommentDTO, String, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "commentReportComment", null);
__decorate([
    (0, common_1.Put)("/:reportId/resolve"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)("userId")),
    __param(2, (0, common_1.Param)("reportId", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_sto_1.ResolveReportDTO, String, Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "resolveReportComment", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_dto_1.QueryReviewAndReportDTO]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReports", null);
__decorate([
    (0, common_1.Get)("/comment/:reportId"),
    __param(0, (0, common_1.Param)("reportId", new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, query_request_dto_1.QueryRequestDTO]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReportComment", null);
__decorate([
    (0, common_1.Get)("/:reportId"),
    __param(0, (0, common_1.Param)("reportId", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReport", null);
exports.ReportController = ReportController = __decorate([
    (0, swagger_1.ApiTags)("report"),
    (0, common_1.Controller)('report'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map