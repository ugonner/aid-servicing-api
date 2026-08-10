"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingUpdateBookingStatus = exports.BookingStatus = void 0;
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "Pending";
    BookingStatus["IN_PROGRESS"] = "In Progress";
    BookingStatus["COMPLETED"] = "Completed";
    BookingStatus["CANCELLED"] = "Cancelled";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
var BookingUpdateBookingStatus;
(function (BookingUpdateBookingStatus) {
    BookingUpdateBookingStatus["CANCELLED"] = "Cancelled";
})(BookingUpdateBookingStatus || (exports.BookingUpdateBookingStatus = BookingUpdateBookingStatus = {}));
//# sourceMappingURL=booking.enum.js.map