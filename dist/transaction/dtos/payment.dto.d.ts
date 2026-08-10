import { PaymentMethod, PaymentPurpose, PaymentStatus } from "../enums/payment.enum";
import { QueryDateDTO } from "../../shared/dtos/query-request.dto copy";
export declare class PaymentDTO {
    bookingId?: number;
    amount?: number;
    paymentMethod: PaymentMethod;
    paymentPurpose: PaymentPurpose;
}
export declare class VerifyPaymentDTO {
    transactionId: string;
    paymentStatus: PaymentStatus;
}
export declare class QueryPaymentTransactionDTO extends QueryDateDTO {
    userId: string;
    paymentStatus: PaymentStatus;
}
