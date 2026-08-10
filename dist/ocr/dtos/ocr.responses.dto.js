"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rechargeVoucherResponse = exports.drugLabelResponse = exports.rReceiptAndInvoiceResponse = exports.currencyIdentificationResponse = exports.basicResponseSchema = exports.genericResponeType = void 0;
const genai_1 = require("@google/genai");
const ocr_enum_1 = require("../enums/ocr.enum");
exports.genericResponeType = {
    type: genai_1.Type.OBJECT,
    properties: {
        confidence: {
            type: genai_1.Type.NUMBER,
            description: 'How confident are you of your accuracy, be blunt',
        },
        documentType: { type: genai_1.Type.STRING, description: `What type of document is this eg ${Object.values(ocr_enum_1.Hard_Document_Type).join(", ")}` },
        content: {
            type: genai_1.Type.STRING,
            description: 'full text detected, maintain format including paragraphs',
        },
        summary: {
            type: genai_1.Type.STRING,
            description: 'A very brief summary of what you detected',
        },
    },
};
exports.basicResponseSchema = {
    type: genai_1.Type.OBJECT,
    properties: {
        baseInformation: exports.genericResponeType
    }
};
exports.currencyIdentificationResponse = {
    type: genai_1.Type.OBJECT,
    properties: {
        amount: { type: genai_1.Type.NUMBER },
        issuer: { type: genai_1.Type.STRING, description: "country and institution" },
        validity: { type: genai_1.Type.STRING, description: "say whether the not is fake or damaged or okay" }
    }
};
exports.rReceiptAndInvoiceResponse = {
    type: genai_1.Type.OBJECT,
    properties: {
        issuer: {
            type: genai_1.Type.STRING,
            description: "company or business or seller's name",
        },
        issuedDate: { type: genai_1.Type.STRING },
        totalAmount: { type: genai_1.Type.STRING, description: 'Total amount for payment' },
        signature: {
            type: genai_1.Type.BOOLEAN,
            description: 'If this document is signed return true else false',
        },
        items: {
            type: genai_1.Type.ARRAY,
            items: {
                type: genai_1.Type.OBJECT,
                properties: {
                    name: { type: genai_1.Type.STRING },
                    quantity: { type: genai_1.Type.NUMBER },
                    unitPrice: { type: genai_1.Type.STRING },
                    subtotal: {
                        type: genai_1.Type.STRING,
                        description: 'Amount to be paid, typically quantity of item multiplied by the unit price',
                    },
                },
            },
        },
    },
};
exports.drugLabelResponse = {
    type: genai_1.Type.OBJECT,
    properties: {
        name: { type: genai_1.Type.STRING },
        dosage: { type: genai_1.Type.STRING },
        usageDirection: {
            type: genai_1.Type.STRING,
            description: 'how to take the medicine',
        },
        contraIndications: {
            type: genai_1.Type.STRING,
            description: 'information about who should not and how not to take the drug',
        },
        expiryDate: { type: genai_1.Type.STRING },
        nafdacNumber: { type: genai_1.Type.STRING },
        manufacturer: { type: genai_1.Type.STRING },
    },
};
exports.rechargeVoucherResponse = {
    type: genai_1.Type.OBJECT,
    properties: {
        issuer: { type: genai_1.Type.STRING },
        pin: { type: genai_1.Type.STRING },
        value: { type: genai_1.Type.STRING },
        rechargeFormat: {
            type: genai_1.Type.STRING,
            description: 'just form the format to be dialled to effect the recharge eg *311*123456789100#*',
        },
    },
};
const prescriptionResponseSchema = {
    type: genai_1.Type.OBJECT,
    properties: {
        hospital: { type: genai_1.Type.STRING },
        patientName: { type: genai_1.Type.STRING },
        doctor: { type: genai_1.Type.STRING },
        prescriptionDate: { type: genai_1.Type.STRING },
        diagnosis: { type: genai_1.Type.STRING },
        medicines: {
            type: genai_1.Type.ARRAY,
            items: {
                type: genai_1.Type.OBJECT,
                properties: {
                    name: { type: genai_1.Type.STRING },
                    dosage: { type: genai_1.Type.STRING },
                    frequency: { type: genai_1.Type.STRING },
                    duration: { type: genai_1.Type.STRING },
                    instructions: { type: genai_1.Type.STRING },
                },
                required: ['name'],
            },
        },
        notes: { type: genai_1.Type.STRING },
        sections: {
            type: genai_1.Type.ARRAY,
            items: {
                type: genai_1.Type.OBJECT,
                properties: {
                    heading: { type: genai_1.Type.STRING },
                    summary: { type: genai_1.Type.STRING },
                    content: { type: genai_1.Type.STRING },
                },
                required: ['heading', 'summary', 'content'],
            },
        },
    },
    required: ['medicines', 'sections'],
};
//# sourceMappingURL=ocr.responses.dto.js.map