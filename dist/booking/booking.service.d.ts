import { DataSource, QueryRunner, SelectQueryBuilder } from 'typeorm';
import { CreateBookingDTO, QueryBookingDTO, UpdateBookinDTO } from '../shared/dtos/booking.dto';
import { Booking } from '../entities/booking.entity';
import { Profile } from '../entities/user.entity';
import { IQueryResult } from '../shared/interfaces/api-response.interface';
import { NotificationService } from '../notifiction/notification.service';
export declare class BookingService {
    private dataSource;
    private notificationService;
    constructor(dataSource: DataSource, notificationService: NotificationService);
    isServiceProfileEligibleForBooking(aidServiceProfileId: number, bookingDto: CreateBookingDTO, queryRunner?: QueryRunner): Promise<boolean>;
    createBooking(dto: CreateBookingDTO, userId: string): Promise<Booking>;
    confirmBookingService(userId: string, bookingId: number, userType: {
        isProvider?: boolean;
        isUser?: boolean;
    }): Promise<Booking>;
    getBooking(bookingId: number): Promise<Booking>;
    getBookingEligibleProfiles(dto: {
        aidServiceId: number;
        bookingStartDateTime: string;
        bookingEndDateTime: string;
    }): Promise<Profile[]>;
    matchBookingWithServiceProfile(bookingData: Booking | number, config: {
        forceMatching: boolean;
    }): Promise<Booking>;
    updateBooking(userId: string, bookingId: number, dto: UpdateBookinDTO): Promise<Booking>;
    scoreProfileToBooking(profile: Profile, booking: Booking): number;
    getQueryBuilder(): SelectQueryBuilder<Booking>;
    getBookings(dto: QueryBookingDTO): Promise<IQueryResult<Booking>>;
}
