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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const payment_dto_1 = require("./dtos/payment.dto");
const user_decorator_1 = require("../shared/guards/decorators/user.decorator");
const apiresponse_1 = require("../shared/helpers/apiresponse");
const jwt_guards_1 = require("../shared/guards/jwt.guards");
const paystack_service_1 = require("./paystack.service");
const payment_enum_1 = require("./enums/payment.enum");
const paystack_enum_1 = require("./enums/paystack.enum");
const wallet_service_1 = require("./wallet.service");
const call_gateway_1 = require("../call/call.gateway");
const events_enum_1 = require("../shared/enums/events.enum");
let TransactionController = class TransactionController {
    constructor(transactionService, paystackService, walletService, eventGateWay) {
        this.transactionService = transactionService;
        this.paystackService = paystackService;
        this.walletService = walletService;
        this.eventGateWay = eventGateWay;
    }
    async createTransaction(payload, userId) {
        const res = await this.transactionService.createTransaction(userId, payload);
        return apiresponse_1.ApiResponse.success("transaction created successfullyy", res);
    }
    async pay(payload, userId) {
        let res;
        const trx = await this.transactionService.createTransaction(userId, payload);
        if (payload.paymentMethod === payment_enum_1.PaymentMethod.PAYSTACK) {
            const paymentData = {
                userId: trx.profile?.userId,
                email: trx.profile?.email,
                amount: trx.amount,
                paymentRef: trx.paymentRef,
                currency: paystack_enum_1.PaystackCurrency.NGN,
            };
            const metadata = {
                transactionId: trx.id,
                paymentStatus: trx.paymentStatus
            };
            res = await this.paystackService.initiatePayment(paymentData, metadata, payload.bookingId);
        }
        return apiresponse_1.ApiResponse.success("transaction created successfullyy", res);
    }
    async verifyPaymentStatus(reference, provider) {
        const res = await this.paystackService.verifyPayment(reference);
        const metadata = {
            transactionId: res.data.metadata.transactionId,
            paymentStatus: /success/i.test(res.data.status) ? payment_enum_1.PaymentStatus.PAID : res.data.status
        };
        const transaction = await this.transactionService.updatePayment(metadata);
        transaction.paymentStatus = metadata.paymentStatus;
        const connectedUser = this.eventGateWay.getUser(transaction.profile.userId);
        if (connectedUser)
            this.eventGateWay.getServer()?.to((await connectedUser)?.socketId)?.emit(events_enum_1.BroadcastEvents.PAYMENT_COMPLETION, transaction);
        return apiresponse_1.ApiResponse.success("Transction updated successfully", transaction);
    }
    async handlePaystackWebhook(rawBody, signature) {
        try {
            const isValid = this.paystackService.verifySignatureByHash(rawBody, signature);
            if (!isValid) {
                throw new common_1.HttpException('Invalid signature', common_1.HttpStatus.UNAUTHORIZED);
            }
            const payload = JSON.parse(rawBody.toString());
            payload.data.metadata.paymentStatus = /success/i.test(payload.data.status) ? payment_enum_1.PaymentStatus.PAID : payload.data.status;
            this.transactionService.updatePayment(payload.data.metadata);
            return apiresponse_1.ApiResponse.success("Payment handled", payload.data.metadata, common_1.HttpStatus.OK);
        }
        catch (error) {
            console.log('Error ', error.message);
            throw new common_1.HttpException('Webhook processing failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateTransactionStatus(payload) {
        const res = await this.transactionService.updatePayment(payload);
        return apiresponse_1.ApiResponse.success("Transction updated successfully", res);
    }
    async getTransactions(payload) {
        const res = await this.transactionService.getTransactions(payload);
        return apiresponse_1.ApiResponse.success("Transations fetched successfullly", res);
    }
    async getUserWallet(userId) {
        const res = await this.walletService.getUserWallet(userId);
        return apiresponse_1.ApiResponse.success("User wallet fetched successfully", res);
    }
    async getTransaction(reference) {
        const res = await this.transactionService.getTransaction(reference);
        return apiresponse_1.ApiResponse.success("Transaction fetched successfully", res);
    }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.PaymentDTO, String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "createTransaction", null);
__decorate([
    (0, common_1.Post)("pay"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.PaymentDTO, String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "pay", null);
__decorate([
    (0, common_1.Get)("verify-payment/:provider"),
    __param(0, (0, common_1.Query)("reference")),
    __param(1, (0, common_1.Param)("provider")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "verifyPaymentStatus", null);
__decorate([
    (0, common_1.Post)('/webhook/verify-payment/paystack'),
    __param(0, (0, common_1.RawBody)()),
    __param(1, (0, common_1.Headers)('x-paystack-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Buffer, String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "handlePaystackWebhook", null);
__decorate([
    (0, common_1.Put)("status"),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.VerifyPaymentDTO]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "updateTransactionStatus", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.QueryPaymentTransactionDTO]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    (0, common_1.Get)("wallet"),
    __param(0, (0, user_decorator_1.User)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getUserWallet", null);
__decorate([
    (0, common_1.Get)("/:reference"),
    __param(0, (0, common_1.Param)("reference")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransaction", null);
exports.TransactionController = TransactionController = __decorate([
    (0, common_1.Controller)('transaction'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService,
        paystack_service_1.PaystackService,
        wallet_service_1.WalletService,
        call_gateway_1.CallGateway])
], TransactionController);
//# sourceMappingURL=transaction.controller.js.map