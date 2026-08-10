import { BookingService } from './booking.service';
import { CreateBookingDTO, QueryBookingDTO, UpdateBookinDTO } from '../shared/dtos/booking.dto';
export declare class BookingController {
    private bookingService;
    constructor(bookingService: BookingService);
    createBooking(payload: CreateBookingDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/booking.entity").Booking>>;
    updateBooking(payload: UpdateBookinDTO, userId: string, bookingId: number): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/booking.entity").Booking>>;
    confirmBookingByProvider(userId: string, bookingId: number): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/booking.entity").Booking>>;
    confirmBookingByUser(userId: string, bookingId: number): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/booking.entity").Booking>>;
    validateProfileForBooking(payload: CreateBookingDTO): Promise<void>;
    getBookings(payload: QueryBookingDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../shared/interfaces/api-response.interface").IQueryResult<import("../entities/booking.entity").Booking>>>;
    getBooking(id: number): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/booking.entity").Booking>>;
}
