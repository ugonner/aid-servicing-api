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
exports.PaystackService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const crypto = require("crypto");
const transaction_service_1 = require("./transaction.service");
let PaystackService = class PaystackService {
    constructor(transactionService) {
        this.transactionService = transactionService;
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        const baseUrl = process.env.PAYSTACK_BASE_URL;
        this.axiosInstance = axios_1.default.create({
            baseURL: baseUrl,
            headers: {
                Authorization: `Bearer ${secretKey}`,
                'Content-Type': 'application/json',
            },
        });
    }
    async initiatePayment(payload, metadata, bookingId) {
        try {
            let callback_page = `/transaction/verify-payment/paystack`;
            const body = {
                ...payload,
                amount: payload.amount * 100,
                callback_url: `${process.env.APP_URL}${callback_page}`,
                reference: payload.paymentRef,
                metadata,
            };
            const response = await this.axiosInstance.post('/transaction/initialize', body);
            return response.data;
        }
        catch (error) {
            console.log('paystack ', error.message);
            throw new common_1.HttpException('Error initiating payment', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifyPayment(reference) {
        try {
            const response = await this.axiosInstance.get(`/transaction/verify/${reference}`);
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Error verifying payment', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    verifySignatureByHash(body, signature) {
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        const hash = crypto
            .createHmac('sha512', secretKey)
            .update(body)
            .digest('hex');
        return hash === signature;
    }
};
exports.PaystackService = PaystackService;
exports.PaystackService = PaystackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], PaystackService);
//# sourceMappingURL=paystack.service.js.map