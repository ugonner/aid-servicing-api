"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const booking_service_1 = require("./booking.service");
const jwt_guards_1 = require("../shared/guards/jwt.guards");
const user_decorator_1 = require("../shared/guards/decorators/user.decorator");
const booking_dto_1 = require("../shared/dtos/booking.dto");
const apiresponse_1 = require("../shared/helpers/apiresponse");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async createBooking(payload) {
        const userId = "ugonna";
        const res = await this.bookingService.createBooking(payload, userId);
        return apiresponse_1.ApiResponse.success("Booking created successfully", res);
    }
    async updateBooking(payload, userId, bookingId) {
        const res = await this.bookingService.updateBooking(userId, bookingId, payload);
        return apiresponse_1.ApiResponse.success("Booking updated successfully", res);
    }
    async confirmBookingByProvider(userId, bookingId) {
        const res = await this.bookingService.confirmBookingService(userId, bookingId, { isProvider: true });
        return apiresponse_1.ApiResponse.success("Booking confirmed successfully", res);
    }
    async confirmBookingByUser(userId, bookingId) {
        const res = await this.bookingService.confirmBookingService(userId, bookingId, { isUser: true });
        return apiresponse_1.ApiResponse.success("Booking confirmed successfully", res);
    }
    async validateProfileForBooking(payload) {
        const res = await this.bookingService.isServiceProfileEligibleForBooking(payload.aidServiceProfileId, payload);
    }
    async getBookings(payload) {
        const res = await this.bookingService.getBookings(payload);
        return apiresponse_1.ApiResponse.success("bookings fetched successfully", res);
    }
    async getBooking(id) {
        const res = await this.bookingService.getBooking(id);
        return apiresponse_1.ApiResponse.success("booking fetched successfully", res);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.CreateBookingDTO]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "createBooking", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    (0, common_1.Put)("/:bookingId"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)("userId")),
    __param(2, (0, common_1.Param)("bookingId", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.UpdateBookinDTO, String, Number]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "updateBooking", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    (0, common_1.Put)("/:bookingId/provider/confirm"),
    __param(0, (0, user_decorator_1.User)("userId")),
    __param(1, (0, common_1.Param)("bookingId", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "confirmBookingByProvider", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    (0, common_1.Put)("/:bookingId/user/confirm"),
    __param(0, (0, user_decorator_1.User)("userId")),
    __param(1, (0, common_1.Param)("bookingId", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "confirmBookingByUser", null);
__decorate([
    (0, common_1.Post)("profile/validate"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.CreateBookingDTO]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "validateProfileForBooking", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.QueryBookingDTO]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookings", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBooking", null);
exports.BookingController = BookingController = __decorate([
    (0, swagger_1.ApiTags)("booking"),
    (0, common_1.Controller)('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map