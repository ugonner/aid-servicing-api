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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const toStream = require("buffer-to-stream");
const cloudinary_1 = require("cloudinary");
let FileUploadService = class FileUploadService {
    constructor() {
        this.awsS3Bucket = process.env.AWS_BUCKET || 'ugonnatalk';
        this.cloudinaryService = cloudinary_1.v2;
        const cloudinaryApiKey = process.env.NODE_ENV === 'production'
            ? process.env.CLOUDINARY_API_KEY
            : process.env.CLOUDINARY_API_KEY;
        const cloudinaryApiKeySecret = process.env.NODE_ENV === 'production'
            ? process.env.CLOUDINARY_API_SECRET
            : process.env.CLOUDINARY_API_SECRET;
        const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const awsRegion = process.env.AWS_REGION || 'eu-north-1';
        const cloudinaryV2 = cloudinary_1.v2;
        this.cloudinaryService.config({
            api_key: cloudinaryApiKey,
            api_secret: cloudinaryApiKeySecret,
            cloud_name: cloudinaryCloudName
        });
    }
    async uploadMessageAttachmentToLocal(file) {
        console.log("file name", file.originalname);
        const attachmentUrl = `/products/${Date.now()}.${file.originalname.replace(" ", "_")}`;
        const filePath = path.join(__dirname, '..', '..', 'public', attachmentUrl);
        fs.writeFileSync(filePath, file.buffer);
        await new Promise((resolve, reject) => {
            fs.writeFile(filePath, file.buffer, (err) => {
                if (err)
                    reject(err);
                resolve(attachmentUrl);
            });
        });
        const attachmentData = {
            attachmentUrl: `${process.env.BASE_URL}${attachmentUrl}`,
            attachmentType: file.mimetype,
        };
        return attachmentData;
    }
    async uploadMessageAttachmentToCloudinary(file) {
        const fileStream = toStream(file.buffer);
        const attachmentType = /video/i.test(file.mimetype) ? 'video' : 'audio';
        const fileExtension = file.originalname.replace(" ", "_");
        const key = `${Date.now()}-${attachmentType}.${fileExtension}`;
        const uploadStreamPromise = await new Promise((resolve, reject) => {
            const uploadStream = this.cloudinaryService.uploader.upload_stream({
                resource_type: "auto"
            }, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
            fileStream.pipe(uploadStream);
        });
        return {
            attachmentType,
            attachmentUrl: uploadStreamPromise.secure_url || uploadStreamPromise.url
        };
    }
    async deletEeFileCloudinary(fileUrl) {
        if (!fileUrl)
            return;
        const fileName = fileUrl.split("/").pop();
        const publicId = fileName ? fileName.split(".")[0] : null;
        if (!publicId)
            return;
        return await this.cloudinaryService.uploader.destroy(publicId);
    }
    async deleteFileLocal(fileUrl) {
        if (!fileUrl)
            return;
        if (process.env.NODE_ENV === "production")
            return this.deletEeFileCloudinary(fileUrl);
        const filePath = fileUrl?.replace(`${process.env.BASE_URL}`, "");
        const fullPath = path.join(__dirname, '..', '..', 'public', filePath);
        const fileExists = fs.existsSync(fullPath);
        if (!fileExists)
            return;
        fs.unlink(fullPath, (err) => {
            if (err) {
                console.log("Error deleting file", err.message);
                return;
            }
            ;
        });
    }
    async deleteFilesLocal(fileUrls) {
        const fullFilePaths = [];
        const unlinkPromise = (filename) => {
            return new Promise((resolve, reject) => {
                fs.unlink(filename, (err) => {
                    if (err)
                        return reject(err);
                    resolve(true);
                });
            });
        };
        await Promise.allSettled(fileUrls.map((fileUrl) => {
            const attachmentUrl = fileUrl.split("/products/")[1];
            const filePath = path.join(__dirname, '..', '..', 'public', "products", attachmentUrl);
            return unlinkPromise(filePath);
        }));
        return true;
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map