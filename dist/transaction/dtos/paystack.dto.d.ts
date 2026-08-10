import { VerifyPaymentDTO } from './payment.dto';
export declare class InitiatePaymentDto {
    amount: number;
    paymentRef: string;
    userId: string;
    email: string;
    channels?: string[];
    currency?: string;
}
export declare class PaystackInitiatePaymentResponseDto {
    authorization_url: string;
    access_code: string;
    reference: string;
}
export declare class PaystackVerifyPaymentResponseDto {
    amount: number;
    currency: string;
    status: 'success' | 'abandoned' | 'failed';
    reference: string;
    authorization: any;
    customer: {
        email: string;
    };
    metadata: VerifyPaymentDTO;
}
export declare class PaystackVerifyPaymentAPIResponse {
    status: boolean;
    data: PaystackVerifyPaymentResponseDto;
}
export declare class PaystackWebHookPayload {
    event: string;
    data: {
        reference: string;
        status: string;
        amount: number;
        currency: string;
        metadata: VerifyPaymentDTO;
    };
    meta?: unknown;
}
