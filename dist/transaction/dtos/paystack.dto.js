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
exports.PaystackWebHookPayload = exports.PaystackVerifyPaymentAPIResponse = exports.PaystackVerifyPaymentResponseDto = exports.PaystackInitiatePaymentResponseDto = exports.InitiatePaymentDto = void 0;
const class_validator_1 = require("class-validator");
const paystack_enum_1 = require("../enums/paystack.enum");
class InitiatePaymentDto {
    constructor() {
        this.currency = paystack_enum_1.PaystackCurrency.NGN;
    }
}
exports.InitiatePaymentDto = InitiatePaymentDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], InitiatePaymentDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InitiatePaymentDto.prototype, "paymentRef", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InitiatePaymentDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], InitiatePaymentDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], InitiatePaymentDto.prototype, "channels", void 0);
class PaystackInitiatePaymentResponseDto {
}
exports.PaystackInitiatePaymentResponseDto = PaystackInitiatePaymentResponseDto;
class PaystackVerifyPaymentResponseDto {
}
exports.PaystackVerifyPaymentResponseDto = PaystackVerifyPaymentResponseDto;
class PaystackVerifyPaymentAPIResponse {
}
exports.PaystackVerifyPaymentAPIResponse = PaystackVerifyPaymentAPIResponse;
class PaystackWebHookPayload {
}
exports.PaystackWebHookPayload = PaystackWebHookPayload;
//# sourceMappingURL=paystack.dto.js.map