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
exports.UpdateBookinDTO = exports.ServiceDeliveryConfirmationDTO = exports.QueryBookingDTO = exports.CreateBookingDTO = exports.BookingDTO = exports.VirtualLocationAddressDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const aid_service_dto_1 = require("./aid-service.dto");
const query_request_dto_copy_1 = require("./query-request.dto copy");
const booking_enum_1 = require("../enums/booking.enum");
class VirtualLocationAddressDTO {
}
exports.VirtualLocationAddressDTO = VirtualLocationAddressDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], VirtualLocationAddressDTO.prototype, "linkAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], VirtualLocationAddressDTO.prototype, "passCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], VirtualLocationAddressDTO.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], VirtualLocationAddressDTO.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], VirtualLocationAddressDTO.prototype, "additionalNotes", void 0);
class BookingDTO {
}
exports.BookingDTO = BookingDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BookingDTO.prototype, "bookingNote", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => aid_service_dto_1.ILocationAddressDTO),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", aid_service_dto_1.ILocationAddressDTO)
], BookingDTO.prototype, "locationAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => VirtualLocationAddressDTO),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", VirtualLocationAddressDTO)
], BookingDTO.prototype, "virtualLocationAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BookingDTO.prototype, "isVirtualLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookingDTO.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BookingDTO.prototype, "duration", void 0);
class CreateBookingDTO extends BookingDTO {
}
exports.CreateBookingDTO = CreateBookingDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBookingDTO.prototype, "aidServiceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBookingDTO.prototype, "aidServiceProfileId", void 0);
class QueryBookingDTO extends query_request_dto_copy_1.QueryDateDTO {
}
exports.QueryBookingDTO = QueryBookingDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryBookingDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(booking_enum_1.BookingStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryBookingDTO.prototype, "bookingStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryBookingDTO.prototype, "isMatched", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryBookingDTO.prototype, "aidServiceProfileId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryBookingDTO.prototype, "aidServiceId", void 0);
class ServiceDeliveryConfirmationDTO {
}
exports.ServiceDeliveryConfirmationDTO = ServiceDeliveryConfirmationDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ServiceDeliveryConfirmationDTO.prototype, "isVirtualLocation", void 0);
class UpdateBookinDTO extends BookingDTO {
}
exports.UpdateBookinDTO = UpdateBookinDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(booking_enum_1.BookingUpdateBookingStatus),
    __metadata("design:type", String)
], UpdateBookinDTO.prototype, "bookingStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBookinDTO.prototype, "bookingStatusNote", void 0);
//# sourceMappingURL=booking.dto.js.map