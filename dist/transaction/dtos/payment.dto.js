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
exports.QueryPaymentTransactionDTO = exports.VerifyPaymentDTO = exports.PaymentDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const payment_enum_1 = require("../enums/payment.enum");
const query_request_dto_copy_1 = require("../../shared/dtos/query-request.dto copy");
class PaymentDTO {
}
exports.PaymentDTO = PaymentDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaymentDTO.prototype, "bookingId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaymentDTO.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(payment_enum_1.PaymentMethod),
    __metadata("design:type", String)
], PaymentDTO.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(payment_enum_1.PaymentPurpose),
    __metadata("design:type", String)
], PaymentDTO.prototype, "paymentPurpose", void 0);
class VerifyPaymentDTO {
}
exports.VerifyPaymentDTO = VerifyPaymentDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyPaymentDTO.prototype, "transactionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(payment_enum_1.PaymentStatus),
    __metadata("design:type", String)
], VerifyPaymentDTO.prototype, "paymentStatus", void 0);
class QueryPaymentTransactionDTO extends query_request_dto_copy_1.QueryDateDTO {
}
exports.QueryPaymentTransactionDTO = QueryPaymentTransactionDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPaymentTransactionDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(payment_enum_1.PaymentStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryPaymentTransactionDTO.prototype, "paymentStatus", void 0);
//# sourceMappingURL=payment.dto.js.map