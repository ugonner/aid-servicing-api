import * as crypto from "crypto";
import { TransactionService } from './transaction.service';
import { InitiatePaymentDto, PaystackInitiatePaymentResponseDto, PaystackVerifyPaymentAPIResponse } from './dtos/paystack.dto';
import { VerifyPaymentDTO } from './dtos/payment.dto';
export declare class PaystackService {
    private transactionService;
    private axiosInstance;
    constructor(transactionService: TransactionService);
    initiatePayment(payload: InitiatePaymentDto, metadata: VerifyPaymentDTO, bookingId: number): Promise<PaystackInitiatePaymentResponseDto>;
    verifyPayment(reference: string): Promise<PaystackVerifyPaymentAPIResponse>;
    verifySignatureByHash(body: crypto.BinaryLike, signature: string): boolean;
}
