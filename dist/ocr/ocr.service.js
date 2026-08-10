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
exports.OCRService = void 0;
const genai_1 = require("@google/genai");
const common_1 = require("@nestjs/common");
const ocr_enum_1 = require("./enums/ocr.enum");
const swagger_1 = require("@nestjs/swagger");
const ocr_responses_dto_1 = require("./dtos/ocr.responses.dto");
let OCRService = class OCRService {
    constructor() {
        this.ai = new genai_1.GoogleGenAI({
            apiKey: `${process.env.GEMINI_API_KEY}`,
        });
    }
    getSystemInstruction(dto) {
        const systemInstruction = `
You are an OCR assistant with high accuracy to read  ${dto.hardDocumentType}.

Extract only information visible on the image.

return null for fields in the response schema that you could not identify.
`;
        return systemInstruction;
    }
    getPrompt(dto) {
        let prompt = ``;
        switch (dto.ocrServiceType) {
            case ocr_enum_1.OCRServiceType.CURRENCY_ID:
                prompt = `Detect the currency note in the image`;
            case ocr_enum_1.OCRServiceType.WHERE_AM_I:
                prompt = `Describe the content of this image, with positioning to guide a visually impaired person`;
            default:
                prompt = `Extract all items, texts, tables, formatting of texts in this document, for a visually impaired person, whith high precision. . Document is in ${dto.hardDocumentForm} form`;
        }
        return `${prompt}`;
    }
    getResponseSchema(dto) {
        let responseSchema = {};
        switch (dto.hardDocumentType) {
            case ocr_enum_1.Hard_Document_Type.MEDICAL_PRESCRIPTION:
                responseSchema = swagger_1.ApiUnsupportedMediaTypeResponse;
            case ocr_enum_1.Hard_Document_Type.PRODUCT_LABEL:
                responseSchema = ocr_responses_dto_1.drugLabelResponse;
            case ocr_enum_1.Hard_Document_Type.INVOICE:
                responseSchema = ocr_responses_dto_1.rReceiptAndInvoiceResponse;
            case ocr_enum_1.Hard_Document_Type.RECEIPT:
                responseSchema = ocr_responses_dto_1.rReceiptAndInvoiceResponse;
            case ocr_enum_1.Hard_Document_Type.RECHARGE_VOUCHER:
                responseSchema = ocr_responses_dto_1.rechargeVoucherResponse;
            case ocr_enum_1.Hard_Document_Type.CURRENCY_NOTE:
                responseSchema = ocr_responses_dto_1.currencyIdentificationResponse;
            default:
                responseSchema = {};
        }
        return {
            type: genai_1.Type.OBJECT,
            properties: {
                baseDetail: ocr_responses_dto_1.genericResponeType,
                particulars: responseSchema
            }
        };
    }
    async describeImage(dto, file) {
        const inlineData = {
            data: file.buffer.toString('base64'),
            mimeType: file.mimetype,
        };
        const prompt = this.getPrompt(dto);
        const systemInstruction = this.getSystemInstruction(dto);
        const responseSchema = this.getResponseSchema(dto);
        const result = await this.ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: [{ inlineData }, { text: prompt }],
            config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema
            },
        });
        return result.text;
    }
    async getModels() {
        const models = await this.ai.models.list();
        const modelLists = [];
        for await (const model of models) {
            console.log(model.name);
            modelLists.push(model);
        }
        return modelLists;
    }
};
exports.OCRService = OCRService;
exports.OCRService = OCRService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OCRService);
//# sourceMappingURL=ocr.service.js.map