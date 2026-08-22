import { GoogleGenAI, Type } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { OCRRequestDto } from './dtos/ocr.request.dto';
import { Hard_Document_Type, OCRServiceType } from './enums/ocr.enum';
import { ApiUnsupportedMediaTypeResponse } from '@nestjs/swagger';
import {
  basicResponseSchema,
  currencyIdentificationResponse,
  drugLabelResponse,
  genericResponeType,
  rechargeVoucherResponse,
  rReceiptAndInvoiceResponse,
} from './dtos/ocr.responses.dto';

@Injectable()
export class OCRService {
  constructor() {}

  private ai = new GoogleGenAI({
    apiKey: `${process.env.GEMINI_API_KEY}`,
  });

  getSystemInstruction(dto: OCRRequestDto): string {
    const systemInstruction = `
You are an OCR assistant with high accuracy to read  ${dto.hardDocumentType}.

Extract only information visible on the image.

return null for fields in the response schema that you could not identify.
`;

    return systemInstruction;
  }

  getPrompt(dto: OCRRequestDto): string {
    let prompt = ``;
    switch (dto.ocrServiceType) {
      case OCRServiceType.CURRENCY_ID:
        prompt = `Detect the currency note in the image`;
      case OCRServiceType.WHERE_AM_I:
        prompt = `Describe the content of this image, with positioning to guide a visually impaired person`;
      default:
        prompt = `Extract all items, texts, tables, formatting of texts in this document, for a visually impaired person, whith high precision. . Document is in ${dto.hardDocumentForm} form`;
    }
    return `${prompt}`;
  }

  getResponseSchema(dto: OCRRequestDto): Object {
    let responseSchema = {};
    switch (dto.hardDocumentType) {
      case Hard_Document_Type.MEDICAL_PRESCRIPTION:
        responseSchema = ApiUnsupportedMediaTypeResponse;
      case Hard_Document_Type.PRODUCT_LABEL:
        responseSchema = drugLabelResponse;
      case Hard_Document_Type.INVOICE:
        responseSchema = rReceiptAndInvoiceResponse;
      case Hard_Document_Type.RECEIPT:
        responseSchema = rReceiptAndInvoiceResponse;
      case Hard_Document_Type.RECHARGE_VOUCHER:
        responseSchema = rechargeVoucherResponse;
      case Hard_Document_Type.CURRENCY_NOTE:
        responseSchema = currencyIdentificationResponse;
      default:
        responseSchema = {};
    }

    return { 
      type: Type.OBJECT,
       properties: {
        baseDetail: genericResponeType(dto),
      particulars: responseSchema 
    }
  };
  }

  async describeImage(dto: OCRRequestDto, file: Express.Multer.File) {
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
    //console.log("GEMINI RESPONSE", result.text);
    return result.text;
  }

  async getModels(){
    const models = await this.ai.models.list();
const modelLists = [];
for await (const model of models) {
  console.log(model.name);
  modelLists.push(model);
}
return modelLists;
  }
}
