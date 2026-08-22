import { Type } from '@google/genai';
import { Hard_Document_Type, OCRServiceType } from '../enums/ocr.enum';
import { OCRRequestDto } from './ocr.request.dto';
export const genericResponeType = (dto: OCRRequestDto) => {
 let contentDescription = [OCRServiceType.HARD_DOCUMENT_READING, OCRServiceType.RECHARGE_CARD, OCRServiceType.CURRENCY_ID].includes(dto.ocrServiceType) ? `If this image is essentially a document like ${Object.values(Hard_Document_Type).join(", ")} or textual, this should be the verbatim of text as detected, maintaining formats including paragraphs. Otherwise, this should be a detailed descriptive narration of every detail observed in the image, including positioning, helpful or guide to a visually impaired person. `:  `Provide a comprehensive, objective, accessibility-focused narration of the image for a visually impaired person. Start with a concise overview of the scene, then describe people including posture and emotion, objects, actions, spatial relationships, environment, colors, visible text, and other relevant visual details. Use positional descriptions such as left, right, foreground, background, above, below, near, and far where useful. Prioritize information that helps the user understand the scene and its context. Indicate any inscriptions on objects. Do not invent or speculate about details that cannot be reliably determined from the image. Clearly indicate uncertainty when necessary.`
 
  return ({
  type: Type.OBJECT,
  properties: {
    confidence: {
      type: Type.NUMBER,
      description: 'How confident are you of your accuracy, be blunt',
    },
    documentType: {type: Type.STRING, description: `What type of document is this eg ${Object.values(Hard_Document_Type).join(", ")}`},
    content: {
      type: Type.STRING,
      description: contentDescription,
    },
    summary: {
      type: Type.STRING,
      description: 'A very brief summary of what you detected',
    },
  },
});
};

export const basicResponseSchema = {
    type: Type.OBJECT,
    properties: {
        baseInformation: genericResponeType
    }
}

export const currencyIdentificationResponse = {
    type: Type.OBJECT, 
    properties: {
        amount: {type: Type.NUMBER},
        issuer: {type: Type.STRING, description: "country and institution"},
        validity: {type: Type.STRING, description: "say whether the not is fake or damaged or okay"}
    }
}



export const rReceiptAndInvoiceResponse = {
  type: Type.OBJECT,
  properties: {
    issuer: {
      type: Type.STRING,
      description: "company or business or seller's name",
    },
    issuedDate: { type: Type.STRING },
    totalAmount: { type: Type.STRING, description: 'Total amount for payment' },
    signature: {
      type: Type.BOOLEAN,
      description: 'If this document is signed return true else false',
    },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          quantity: { type: Type.NUMBER },
          unitPrice: { type: Type.STRING },
          subtotal: {
            type: Type.STRING,
            description:
              'Amount to be paid, typically quantity of item multiplied by the unit price',
          },
        },
      },
    },
  },
};

export const drugLabelResponse = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    dosage: { type: Type.STRING },
    usageDirection: {
      type: Type.STRING,
      description: 'how to take the medicine',
    },
    contraIndications: {
      type: Type.STRING,
      description:
        'information about who should not and how not to take the drug',
    },
    expiryDate: { type: Type.STRING },
    nafdacNumber: { type: Type.STRING },
    manufacturer: { type: Type.STRING },
  },
};

export const rechargeVoucherResponse = {
  type: Type.OBJECT,
  properties: {
    issuer: { type: Type.STRING },
    pin: { type: Type.STRING },
    value: { type: Type.STRING },
    rechargeFormat: {
      type: Type.STRING,
      description:
        'just form the format to be dialled to effect the recharge eg *311*123456789100#*',
    },
  },
};

const prescriptionResponseSchema = {
  type: Type.OBJECT,
  properties: {
    hospital: { type: Type.STRING },
    patientName: { type: Type.STRING },
    doctor: { type: Type.STRING },
    prescriptionDate: { type: Type.STRING },
    diagnosis: { type: Type.STRING },

    medicines: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          dosage: { type: Type.STRING },
          frequency: { type: Type.STRING },
          duration: { type: Type.STRING },
          instructions: { type: Type.STRING },
        },
        required: ['name'],
      },
    },

    notes: { type: Type.STRING },

    sections: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          heading: { type: Type.STRING },
          summary: { type: Type.STRING },
          content: { type: Type.STRING },
        },
        required: ['heading', 'summary', 'content'],
      },
    },
  },
  required: ['medicines', 'sections'],
};
