import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PaystackService } from './wallet/paystack.service';
import { BookingModule } from '../booking/booking.module';
import { WalletService } from './wallet/wallet.service';

@Module({
  imports: [BookingModule],
  controllers: [TransactionController],
  providers: [TransactionService, PaystackService, WalletService]
})
export class TransactionModule {}
