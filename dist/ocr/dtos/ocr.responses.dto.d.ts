import { Type } from '@google/genai';
import { OCRRequestDto } from './ocr.request.dto';
export declare const genericResponeType: (dto: OCRRequestDto) => {
    type: Type;
    properties: {
        confidence: {
            type: Type;
            description: string;
        };
        documentType: {
            type: Type;
            description: string;
        };
        content: {
            type: Type;
            description: string;
        };
        summary: {
            type: Type;
            description: string;
        };
    };
};
export declare const basicResponseSchema: {
    type: Type;
    properties: {
        baseInformation: (dto: OCRRequestDto) => {
            type: Type;
            properties: {
                confidence: {
                    type: Type;
                    description: string;
                };
                documentType: {
                    type: Type;
                    description: string;
                };
                content: {
                    type: Type;
                    description: string;
                };
                summary: {
                    type: Type;
                    description: string;
                };
            };
        };
    };
};
export declare const currencyIdentificationResponse: {
    type: Type;
    properties: {
        amount: {
            type: Type;
        };
        issuer: {
            type: Type;
            description: string;
        };
        validity: {
            type: Type;
            description: string;
        };
    };
};
export declare const rReceiptAndInvoiceResponse: {
    type: Type;
    properties: {
        issuer: {
            type: Type;
            description: string;
        };
        issuedDate: {
            type: Type;
        };
        totalAmount: {
            type: Type;
            description: string;
        };
        signature: {
            type: Type;
            description: string;
        };
        items: {
            type: Type;
            items: {
                type: Type;
                properties: {
                    name: {
                        type: Type;
                    };
                    quantity: {
                        type: Type;
                    };
                    unitPrice: {
                        type: Type;
                    };
                    subtotal: {
                        type: Type;
                        description: string;
                    };
                };
            };
        };
    };
};
export declare const drugLabelResponse: {
    type: Type;
    properties: {
        name: {
            type: Type;
        };
        dosage: {
            type: Type;
        };
        usageDirection: {
            type: Type;
            description: string;
        };
        contraIndications: {
            type: Type;
            description: string;
        };
        expiryDate: {
            type: Type;
        };
        nafdacNumber: {
            type: Type;
        };
        manufacturer: {
            type: Type;
        };
    };
};
export declare const rechargeVoucherResponse: {
    type: Type;
    properties: {
        issuer: {
            type: Type;
        };
        pin: {
            type: Type;
        };
        value: {
            type: Type;
        };
        rechargeFormat: {
            type: Type;
            description: string;
        };
    };
};
