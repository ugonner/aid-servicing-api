import { TransactionService } from './transaction.service';
import { PaymentDTO, QueryPaymentTransactionDTO, VerifyPaymentDTO } from './dtos/payment.dto';
import { PaystackService } from './paystack.service';
import { PaystackInitiatePaymentResponseDto } from './dtos/paystack.dto';
import { WalletService } from './wallet.service';
import { CallGateway } from '../call/call.gateway';
export declare class TransactionController {
    private transactionService;
    private paystackService;
    private walletService;
    private eventGateWay;
    constructor(transactionService: TransactionService, paystackService: PaystackService, walletService: WalletService, eventGateWay: CallGateway);
    createTransaction(payload: PaymentDTO, userId: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/transaction.entity").PaymentTransaction>>;
    pay(payload: PaymentDTO, userId: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<PaystackInitiatePaymentResponseDto>>;
    verifyPaymentStatus(reference: string, provider: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/transaction.entity").PaymentTransaction>>;
    handlePaystackWebhook(rawBody: Buffer, signature: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<any>>;
    updateTransactionStatus(payload: VerifyPaymentDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/transaction.entity").PaymentTransaction>>;
    getTransactions(payload: QueryPaymentTransactionDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../shared/interfaces/api-response.interface").IQueryResult<import("../entities/transaction.entity").PaymentTransaction>>>;
    getUserWallet(userId: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/user-wallet.entity").ProfileWallet>>;
    getTransaction(reference: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/transaction.entity").PaymentTransaction>>;
}
