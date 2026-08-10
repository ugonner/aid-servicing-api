import { ILocationAddressDTO } from './aid-service.dto';
import { QueryDateDTO } from './query-request.dto copy';
import { BookingStatus, BookingUpdateBookingStatus } from '../enums/booking.enum';
export declare class VirtualLocationAddressDTO {
    linkAddress: string;
    passCode?: string;
    userName?: string;
    platform?: string;
    additionalNotes?: string;
}
export declare class BookingDTO {
    bookingNote?: string;
    locationAddress?: ILocationAddressDTO;
    virtualLocationAddress?: VirtualLocationAddressDTO;
    isVirtualLocation: boolean;
    startDate: string;
    duration: number;
}
export declare class CreateBookingDTO extends BookingDTO {
    aidServiceId: number;
    aidServiceProfileId?: number;
}
export declare class QueryBookingDTO extends QueryDateDTO {
    userId: string;
    bookingStatus?: BookingStatus;
    isMatched: string;
    aidServiceProfileId?: string;
    aidServiceId?: string;
}
export declare class ServiceDeliveryConfirmationDTO {
    isVirtualLocation: boolean;
}
export declare class UpdateBookinDTO extends BookingDTO {
    bookingStatus: BookingUpdateBookingStatus;
    bookingStatusNote?: string;
}
