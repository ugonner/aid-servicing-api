import { OCRService } from './ocr.service';
import { OCRRequestDto } from './dtos/ocr.request.dto';
export declare class OCRController {
    private ocrService;
    constructor(ocrService: OCRService);
    extractImageContent(file: Express.Multer.File, payload: OCRRequestDto): Promise<import("../shared/helpers/apiresponse").IApiResponse<string>>;
    getModels(): Promise<import("../shared/helpers/apiresponse").IApiResponse<any[]>>;
}
