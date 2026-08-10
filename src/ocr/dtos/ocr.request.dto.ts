import { IsEnum, IsOptional, IsString } from "class-validator";
import { Hard_Document_Form, Hard_Document_Type, OCRServiceType } from "../enums/ocr.enum";

export class OCRRequestDto {
    @IsEnum(OCRServiceType)
    ocrServiceType: OCRServiceType;

    @IsEnum(Hard_Document_Form)
    @IsOptional()
    hardDocumentForm?: Hard_Document_Type;

    @IsEnum(Hard_Document_Type)
    @IsOptional()
    hardDocumentType?: Hard_Document_Type;
}