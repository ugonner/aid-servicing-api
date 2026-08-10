import { OCRRequestDto } from './dtos/ocr.request.dto';
export declare class OCRService {
    constructor();
    private ai;
    getSystemInstruction(dto: OCRRequestDto): string;
    getPrompt(dto: OCRRequestDto): string;
    getResponseSchema(dto: OCRRequestDto): Object;
    describeImage(dto: OCRRequestDto, file: Express.Multer.File): Promise<string>;
    getModels(): Promise<any[]>;
}
