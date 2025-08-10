import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AidServiceTag } from "./aid-service-tag.entity";
import { BookingStatus } from "../shared/enums/booking.enum";
import { PaymentStatus } from "../shared/enums/payment.enum";
import { ILocationAddressDTO } from "../shared/dtos/aid-service.dto";
import { Profile } from "./user.entity";
import { AidService } from "./aid-service.entity";
import { AidServiceProfile } from "./aid-service-profile.entity";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  compositeBookingId: string;

  @Column({default: BookingStatus.PENDING})
  bookingStatus: BookingStatus;

  @Column({default: PaymentStatus.NOT_PAID})
  paymentStatus: PaymentStatus;

  @Column({default: 0.0})
  totalAmount: number;

  @Column({nullable: true})
  bookingNote: string;

  @Column({type: "json"})
  locationAddress: ILocationAddressDTO

  @Column()
  startDate: string;
  @Column()
  startTime: string;

  @Column()
  endDate: string;
 
  @Column()
  endTime: string;

  @Column({default: 0})
duration: number;

@Column({type: "bool", default: false})
isMatched: boolean;
@Column({type: "bool", default: false})
confirmedByProvider: boolean;
@Column({type: "bool", default: false})
confirmedByUser: boolean;

@ManyToOne(() => AidService, (aidService) => aidService.bookings)
aidService: AidService;

@ManyToOne(() => AidServiceProfile, (aidServiceProfile) => aidServiceProfile.bookings)
aidServiceProfile: AidServiceProfile;



@ManyToOne(() => Profile, (profile) => profile.bookings )
profile: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date

  @Column({type: "bool", default: false})
  isDeleted: boolean;
}