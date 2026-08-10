import { Profile } from "./user.entity";
import { PaymentMethod, PaymentPurpose, PaymentStatus } from "../transaction/enums/payment.enum";
import { Booking } from "./booking.entity";
export declare class PaymentTransaction {
    id?: string;
    paymentRef: string;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    paymentPurpose: PaymentPurpose;
    amount: number;
    booking: Booking;
    profile: Profile;
    createdAt: Date;
    updatedAt: Date;
}
