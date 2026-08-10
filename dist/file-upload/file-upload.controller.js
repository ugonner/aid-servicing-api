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
exports.FileUploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const file_upload_service_1 = require("./file-upload.service");
const apiresponse_1 = require("../shared/helpers/apiresponse");
const all_exceptions_filter_1 = require("../shared/interceptors/all-exceptions.filter");
let FileUploadController = class FileUploadController {
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
    async createAudioFile(file) {
        let res;
        if (/cloudinary/i.test(process.env.STORAGE_PLATFORM))
            res =
                await this.fileUploadService.uploadMessageAttachmentToCloudinary(file);
        else
            res = await this.fileUploadService.uploadMessageAttachmentToLocal(file);
        return apiresponse_1.ApiResponse.success('file uploaded successfuly', res);
    }
    async addMultipleFiles(files) {
        let res;
        if (!files || files.length === 0)
            return apiresponse_1.ApiResponse.fail('No files uploaded', common_1.HttpStatus.BAD_REQUEST);
        res = await Promise.all(files.map((file) => {
            if (/cloudinary/i.test(process.env.STORAGE_PLATFORM))
                return this.fileUploadService.uploadMessageAttachmentToCloudinary(file);
            else
                return this.fileUploadService.uploadMessageAttachmentToLocal(file);
        }));
        return apiresponse_1.ApiResponse.success('file uploaded successfuly', res);
    }
    async deleteFiles(payload) {
        const res = await this.fileUploadService.deleteFilesLocal(payload.fileUrls);
        return apiresponse_1.ApiResponse.success("files deleted successfully", res);
    }
    async deleteFile(payload) {
        const res = await this.fileUploadService.deleteFileLocal(payload.fileUrl);
        return apiresponse_1.ApiResponse.success("file deleted successfully", res);
    }
};
exports.FileUploadController = FileUploadController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "createAudioFile", null);
__decorate([
    (0, common_1.Post)('multiple'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "addMultipleFiles", null);
__decorate([
    (0, common_1.Delete)("multiple"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "deleteFiles", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "deleteFile", null);
exports.FileUploadController = FileUploadController = __decorate([
    (0, common_1.Controller)('file-upload'),
    (0, common_1.UseFilters)(all_exceptions_filter_1.AllExceptionFilter),
    __metadata("design:paramtypes", [file_upload_service_1.FileUploadService])
], FileUploadController);
//# sourceMappingURL=file-upload.controller.js.map