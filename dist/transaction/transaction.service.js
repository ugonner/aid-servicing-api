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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("../entities/transaction.entity");
const crypto = require("crypto");
const uuid_1 = require("uuid");
const booking_entity_1 = require("../entities/booking.entity");
const booking_enum_1 = require("../shared/enums/booking.enum");
const payment_enum_1 = require("./enums/payment.enum");
const user_entity_1 = require("../entities/user.entity");
const user_wallet_entity_1 = require("../entities/user-wallet.entity");
const booking_service_1 = require("../booking/booking.service");
const db_1 = require("../shared/helpers/db");
let TransactionService = class TransactionService {
    constructor(dataSource, bookingService) {
        this.dataSource = dataSource;
        this.bookingService = bookingService;
    }
    generateReference() {
        const input = `${(0, uuid_1.v4)()}-${Date.now()}`;
        return crypto
            .createHash('sha256')
            .update(input)
            .digest('hex')
            .substr(0, 12);
    }
    async createTransaction(userId, dto) {
        let transaction;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const { bookingId, ...transactionDto } = dto;
            const profile = await queryRunner.manager.findOneBy(user_entity_1.Profile, { userId });
            let trxData = queryRunner.manager.create(transaction_entity_1.PaymentTransaction, { ...transactionDto, paymentStatus: payment_enum_1.PaymentStatus.PENDING });
            if (dto.paymentPurpose === payment_enum_1.PaymentPurpose.SERVICE_PAYMENT) {
                const booking = await queryRunner.manager.findOne(booking_entity_1.Booking, {
                    where: { id: bookingId },
                    relations: [
                        'profile',
                        'aidServiceProfile',
                        'aidServiceProfile.profile',
                    ],
                });
                if (!booking)
                    throw new common_1.NotFoundException('Booking not found');
                if (booking.paymentStatus === payment_enum_1.PaymentStatus.PAID)
                    throw new common_1.BadRequestException('This booking is already in progress state and has already been paid for');
                const trxExists = await queryRunner.manager.findOne(transaction_entity_1.PaymentTransaction, {
                    where: { booking: { id: booking.id } },
                    relations: ["profile"]
                });
                if (trxExists) {
                    if (trxExists.paymentStatus === payment_enum_1.PaymentStatus.PAID)
                        throw new common_1.BadRequestException("Transaction already paid for");
                    transaction = trxExists;
                    return;
                }
                trxData.amount = Number(booking.totalAmount);
                trxData.booking = booking;
            }
            trxData.paymentRef = this.generateReference();
            trxData.profile = profile;
            const trx = await queryRunner.manager.save(transaction_entity_1.PaymentTransaction, trxData);
            await queryRunner.commitTransaction();
            transaction = trx;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return transaction;
        }
    }
    async updatePayment(dto) {
        let transaction;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const trx = await queryRunner.manager.findOne(transaction_entity_1.PaymentTransaction, {
                where: { id: dto.transactionId },
                relations: ["profile", 'booking', "booking.aidService"],
            });
            if (!trx)
                throw new common_1.NotFoundException('Transaction record not found');
            if (trx.paymentStatus === dto.paymentStatus)
                throw new common_1.BadRequestException("Transaction already updated");
            if (trx.paymentPurpose === payment_enum_1.PaymentPurpose.SERVICE_PAYMENT) {
                const booking = trx.booking;
                if (!booking)
                    throw new common_1.NotFoundException('Booking not found');
                if (dto.paymentStatus === payment_enum_1.PaymentStatus.PAID) {
                    const userWallet = await queryRunner.manager.findOneBy(user_wallet_entity_1.ProfileWallet, {
                        profile: { userId: trx.profile?.userId },
                    });
                    if (!userWallet)
                        throw new common_1.NotFoundException('wallet not found');
                    userWallet.pendingBalance =
                        Number(userWallet.pendingBalance) + Number(trx.amount);
                    await queryRunner.manager.save(user_wallet_entity_1.ProfileWallet, { ...userWallet });
                    this.bookingService.matchBookingWithServiceProfile(booking, { forceMatching: false });
                }
                booking.bookingStatus =
                    dto.paymentStatus === payment_enum_1.PaymentStatus.PAID
                        ? booking_enum_1.BookingStatus.IN_PROGRESS
                        : booking_enum_1.BookingStatus.CANCELLED;
                booking.paymentStatus = dto.paymentStatus;
                await queryRunner.manager.save(booking_entity_1.Booking, booking);
            }
            else if (trx.paymentPurpose === payment_enum_1.PaymentPurpose.FUND_DEPOSIT) {
                if (dto.paymentStatus === payment_enum_1.PaymentStatus.PAID) {
                    const userWallet = await queryRunner.manager.findOneBy(user_wallet_entity_1.ProfileWallet, {
                        profile: { userId: trx.profile?.userId },
                    });
                    if (!userWallet)
                        throw new common_1.NotFoundException('wallet not found');
                    userWallet.fundedBalance =
                        Number(userWallet.fundedBalance) + Number(trx.amount);
                    await queryRunner.manager.save(user_wallet_entity_1.ProfileWallet, { ...userWallet });
                }
            }
            trx.paymentStatus = dto.paymentStatus;
            const trxData = await queryRunner.manager.save(transaction_entity_1.PaymentTransaction, trx);
            await queryRunner.commitTransaction();
            transaction = trxData;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return transaction;
        }
    }
    async getTransaction(idOrReference) {
        return await this.dataSource
            .createQueryRunner()
            .manager.findOne(transaction_entity_1.PaymentTransaction, {
            where: [{ paymentRef: idOrReference }, { id: idOrReference }],
            relations: ['booking'],
        });
    }
    getQueryBuilder() {
        return this.dataSource
            .getRepository(transaction_entity_1.PaymentTransaction)
            .createQueryBuilder('paymentTransaction')
            .leftJoinAndSelect('paymentTransaction.profile', 'profile')
            .leftJoinAndSelect("paymentTransaction.booking", "booking");
    }
    async getTransactions(dto) {
        const { userId, searchTerm, startDate, endDate, dDate, order, page, limit, ...queryFields } = dto;
        const queryPage = page ? Number(page) : 1;
        const queryLimit = limit ? Number(limit) : 10;
        const queryOrder = order ? order.toUpperCase() : 'DESC';
        const queryOrderBy = 'createdAt';
        let queryBuilder = this.getQueryBuilder();
        queryBuilder.where('booking.isDeleted != :isDeleted', { isDeleted: true });
        if (queryFields) {
            Object.keys(queryFields).forEach((field) => {
                queryBuilder.andWhere(`booking.${field} = :value`, {
                    value: queryFields[field],
                });
            });
        }
        if (startDate || endDate || dDate) {
            queryBuilder = (0, db_1.handleDateQuery)({ startDate, endDate, dDate, entityAlias: 'paymentTransaction' }, queryBuilder, 'createdAt');
        }
        if (userId) {
            queryBuilder.andWhere("profile.userId = :userId", { userId });
        }
        if (searchTerm) {
            const searchFields = ['name', 'description'];
            let queryStr = `paymentTransaction.createdAt LIKE :searchTerm`;
            ['email', 'userId', 'firstName', 'lastName'].forEach((field) => {
                queryStr += ` OR LOWER(profile.${field}) LIKE :searchTerm`;
            });
            queryBuilder.andWhere(queryStr, {
                searchTerm: `%${searchTerm.toLowerCase().trim()}%`,
            });
        }
        const [data, total] = await queryBuilder
            .orderBy(`paymentTransaction.${queryOrderBy}`, queryOrder)
            .skip((queryPage - 1) * queryLimit)
            .limit(queryLimit)
            .getManyAndCount();
        return { page: queryPage, limit: queryLimit, total, data };
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        booking_service_1.BookingService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map