import { IAttachment } from '../shared/interfaces/typings';
export declare class FileUploadService {
    private awsS3Bucket;
    private cloudinaryService;
    constructor();
    uploadMessageAttachmentToLocal(file: Express.Multer.File): Promise<IAttachment>;
    uploadMessageAttachmentToCloudinary(file: Express.Multer.File): Promise<IAttachment>;
    deletEeFileCloudinary(fileUrl: string): Promise<any>;
    deleteFileLocal(fileUrl: string): Promise<any>;
    deleteFilesLocal(fileUrls: string[]): Promise<boolean>;
}
