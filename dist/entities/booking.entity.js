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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const booking_enum_1 = require("../shared/enums/booking.enum");
const aid_service_dto_1 = require("../shared/dtos/aid-service.dto");
const user_entity_1 = require("./user.entity");
const aid_service_entity_1 = require("./aid-service.entity");
const aid_service_profile_entity_1 = require("./aid-service-profile.entity");
const booking_dto_1 = require("../shared/dtos/booking.dto");
const transaction_entity_1 = require("./transaction.entity");
const payment_enum_1 = require("../transaction/enums/payment.enum");
let Booking = class Booking {
};
exports.Booking = Booking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Booking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Booking.prototype, "compositeBookingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: booking_enum_1.BookingStatus.PENDING }),
    __metadata("design:type", String)
], Booking.prototype, "bookingStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "bookingStatusNote", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: payment_enum_1.PaymentStatus.NOT_PAID }),
    __metadata("design:type", String)
], Booking.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0.0 }),
    __metadata("design:type", Number)
], Booking.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "bookingNote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json", nullable: true }),
    __metadata("design:type", aid_service_dto_1.ILocationAddressDTO)
], Booking.prototype, "locationAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json", nullable: true }),
    __metadata("design:type", booking_dto_1.VirtualLocationAddressDTO)
], Booking.prototype, "virtualLocationAddress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Booking.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Booking.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Booking.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "isMatched", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "confirmedByProvider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "confirmedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "isVirtualLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0 }),
    __metadata("design:type", Number)
], Booking.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Booking.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => aid_service_entity_1.AidService, (aidService) => aidService.bookings),
    __metadata("design:type", aid_service_entity_1.AidService)
], Booking.prototype, "aidService", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => aid_service_profile_entity_1.AidServiceProfile, (aidServiceProfile) => aidServiceProfile.bookings),
    __metadata("design:type", aid_service_profile_entity_1.AidServiceProfile)
], Booking.prototype, "aidServiceProfile", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Profile, (profile) => profile.bookings),
    __metadata("design:type", user_entity_1.Profile)
], Booking.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => transaction_entity_1.PaymentTransaction, (trx) => trx.booking),
    __metadata("design:type", transaction_entity_1.PaymentTransaction)
], Booking.prototype, "paymentTransaction", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Booking.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "isDeleted", void 0);
exports.Booking = Booking = __decorate([
    (0, typeorm_1.Entity)()
], Booking);
//# sourceMappingURL=booking.entity.js.map