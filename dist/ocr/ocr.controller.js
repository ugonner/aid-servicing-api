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
exports.OCRController = void 0;
const common_1 = require("@nestjs/common");
const all_exceptions_filter_1 = require("../shared/interceptors/all-exceptions.filter");
const swagger_1 = require("@nestjs/swagger");
const ocr_service_1 = require("./ocr.service");
const platform_express_1 = require("@nestjs/platform-express");
const ocr_request_dto_1 = require("./dtos/ocr.request.dto");
const apiresponse_1 = require("../shared/helpers/apiresponse");
let OCRController = class OCRController {
    constructor(ocrService) {
        this.ocrService = ocrService;
    }
    async extractImageContent(file, payload) {
        const res = await this.ocrService.describeImage(payload, file);
        return apiresponse_1.ApiResponse.success("Image extracted successfully", res);
    }
    async getModels() {
        const res = await this.ocrService.getModels();
        return apiresponse_1.ApiResponse.success("Models got successfully", res);
    }
};
exports.OCRController = OCRController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ocr_request_dto_1.OCRRequestDto]),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "extractImageContent", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OCRController.prototype, "getModels", null);
exports.OCRController = OCRController = __decorate([
    (0, swagger_1.ApiTags)("ocr"),
    (0, common_1.UseFilters)(all_exceptions_filter_1.AllExceptionFilter),
    (0, common_1.Controller)("ocr"),
    __metadata("design:paramtypes", [ocr_service_1.OCRService])
], OCRController);
//# sourceMappingURL=ocr.controller.js.map