import { HttpStatus } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { IAttachment } from '../shared/interfaces/typings';
export declare class FileUploadController {
    private fileUploadService;
    constructor(fileUploadService: FileUploadService);
    createAudioFile(file: Express.Multer.File): Promise<import("../shared/helpers/apiresponse").IApiResponse<IAttachment>>;
    addMultipleFiles(files: Express.Multer.File[]): Promise<import("../shared/helpers/apiresponse").IApiResponse<HttpStatus> | import("../shared/helpers/apiresponse").IApiResponse<IAttachment[]>>;
    deleteFiles(payload: {
        fileUrls: string[];
    }): Promise<import("../shared/helpers/apiresponse").IApiResponse<boolean>>;
    deleteFile(payload: {
        fileUrl: string;
    }): Promise<import("../shared/helpers/apiresponse").IApiResponse<any>>;
}
