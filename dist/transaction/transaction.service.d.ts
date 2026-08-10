import { DataSource, SelectQueryBuilder } from 'typeorm';
import { PaymentTransaction } from '../entities/transaction.entity';
import { PaymentDTO, QueryPaymentTransactionDTO, VerifyPaymentDTO } from './dtos/payment.dto';
import { BookingService } from '../booking/booking.service';
import { IQueryResult } from '../shared/interfaces/api-response.interface';
export declare class TransactionService {
    private dataSource;
    private bookingService;
    constructor(dataSource: DataSource, bookingService: BookingService);
    private generateReference;
    createTransaction(userId: string, dto: PaymentDTO): Promise<PaymentTransaction>;
    updatePayment(dto: VerifyPaymentDTO): Promise<PaymentTransaction>;
    getTransaction(idOrReference: string): Promise<PaymentTransaction>;
    getQueryBuilder(): SelectQueryBuilder<PaymentTransaction>;
    getTransactions(dto: QueryPaymentTransactionDTO): Promise<IQueryResult<PaymentTransaction>>;
}
