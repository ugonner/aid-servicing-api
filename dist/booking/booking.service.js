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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("../entities/booking.entity");
const user_entity_1 = require("../entities/user.entity");
const aid_service_entity_1 = require("../entities/aid-service.entity");
const aid_service_profile_entity_1 = require("../entities/aid-service-profile.entity");
const booking_enum_1 = require("../shared/enums/booking.enum");
const user_wallet_entity_1 = require("../entities/user-wallet.entity");
const db_1 = require("../shared/helpers/db");
const notification_service_1 = require("../notifiction/notification.service");
const notification_enum_1 = require("../notifiction/enums/notification.enum");
let BookingService = class BookingService {
    constructor(dataSource, notificationService) {
        this.dataSource = dataSource;
        this.notificationService = notificationService;
    }
    async isServiceProfileEligibleForBooking(aidServiceProfileId, bookingDto, queryRunner) {
        queryRunner = queryRunner || this.dataSource.createQueryRunner();
        if (!aidServiceProfileId)
            throw new common_1.BadRequestException('aidServiceProfileId is required');
        const aidServiceProfile = await queryRunner.manager.findOne(aid_service_profile_entity_1.AidServiceProfile, {
            where: { id: aidServiceProfileId },
            relations: ['profile', 'aidService'],
        });
        const availableProfiles = await this.getBookingEligibleProfiles({
            bookingStartDateTime: bookingDto.startDate,
            bookingEndDateTime: new Date(new Date(bookingDto.startDate).getTime() + Number(bookingDto.duration)).toISOString(),
            aidServiceId: bookingDto.aidServiceId,
        });
        if (aidServiceProfile.aidService?.id !== bookingDto.aidServiceId)
            throw new common_1.BadRequestException('Selected provider does not offer the service');
        if (!availableProfiles.find((profile) => profile.userId === aidServiceProfile.profile?.userId))
            throw new common_1.BadRequestException('Selected provider is not available');
        return true;
    }
    async createBooking(dto, userId) {
        let newBooking;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const { aidServiceId, aidServiceProfileId, ...bookingDto } = dto;
            const profile = await queryRunner.manager.findOneBy(user_entity_1.Profile, { userId });
            if (!profile)
                throw new common_1.NotFoundException('user not found');
            const aidService = await queryRunner.manager.findOneBy(aid_service_entity_1.AidService, {
                id: aidServiceId,
            });
            if (!aidService)
                throw new common_1.BadRequestException('Aid service does not exist');
            const endDate = new Date(new Date(bookingDto.startDate).getTime() + Number(bookingDto.duration)).toISOString();
            const bookingInstance = queryRunner.manager.create(booking_entity_1.Booking, {
                ...bookingDto,
                startDate: bookingDto.startDate,
                endDate,
                aidService,
                profile,
            });
            bookingInstance.totalAmount = Math.ceil((Number(bookingDto.duration) / 1000) *
                (dto.isVirtualLocation
                    ? Number(aidService.videoCallRate)
                    : Number(aidService.onSiteRate)));
            bookingInstance.totalAmount =
                (Number(process.env.VAT_RATE) / 100) *
                    Number(bookingInstance.totalAmount) +
                    Number(bookingInstance.totalAmount);
            bookingInstance.compositeBookingId = `${profile.userId}-${new Date(bookingDto.startDate).getTime()}`;
            if (aidServiceProfileId) {
                const aidServiceProfile = await queryRunner.manager.findOne(aid_service_profile_entity_1.AidServiceProfile, {
                    where: { id: aidServiceProfileId },
                    relations: ['profile', 'aidService'],
                });
                const availableProfiles = await this.getBookingEligibleProfiles({
                    bookingStartDateTime: bookingInstance.startDate,
                    bookingEndDateTime: bookingInstance.endDate,
                    aidServiceId: aidServiceId,
                });
                if (aidServiceProfile.aidService?.id !== aidServiceId)
                    throw new common_1.BadRequestException('Selected provider does not offer the service');
                if (!availableProfiles.find((profile) => profile.userId === aidServiceProfile.profile?.userId))
                    throw new common_1.BadRequestException('Selected provider is not available');
                bookingInstance.aidServiceProfile = aidServiceProfile;
                bookingInstance.isMatched = true;
            }
            const savedBooking = await queryRunner.manager.save(booking_entity_1.Booking, bookingInstance);
            await queryRunner.commitTransaction();
            newBooking = savedBooking;
            const notificationDto = {
                creator: profile,
                receivers: [profile],
                notificationEventType: notification_enum_1.NotificationEventType.AID_SERVICE_BOOKING_CREATION,
                context: notification_enum_1.NotificationContext.SERVICE_BOOKING,
                contextEntityId: savedBooking.id,
                title: notification_enum_1.NotificationEventType.AID_SERVICE_BOOKING_CREATION,
                description: 'A Booking has been created for a service with detail',
                avatar: profile.avatar || aidService?.avatar,
                data: {
                    "link": `${process.env.APP_URL}/booking/invoice?bi=${savedBooking.id}`,
                    'Composte Booking No': savedBooking.compositeBookingId,
                },
            };
            this.notificationService.sendNotification(notificationDto, {
                sendEmail: true,
                notifyAdmin: true,
            });
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return newBooking;
        }
    }
    async confirmBookingService(userId, bookingId, userType) {
        let updatedBooking;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const profile = await queryRunner.manager.findOneBy(user_entity_1.Profile, { userId });
            if (!profile)
                throw new common_1.NotFoundException("User profile not found");
            const booking = await queryRunner.manager.findOne(booking_entity_1.Booking, {
                where: { id: bookingId },
                relations: [
                    'profile',
                    'aidServiceProfile',
                    'aidServiceProfile.profile',
                ],
            });
            if (!booking)
                throw new common_1.NotFoundException('booking not found');
            if (userType.isProvider) {
                if (booking.aidServiceProfile?.profile?.userId !== userId)
                    throw new common_1.BadRequestException('You are not the provider of this service');
                booking.confirmedByProvider = true;
            }
            if (userType.isUser) {
                if (booking.profile?.userId !== userId)
                    throw new common_1.BadRequestException('You are not the owner of this booking');
                booking.confirmedByUser = true;
                const bookingAidServiceProfile = booking.aidServiceProfile;
                const userWallet = await queryRunner.manager.findOneBy(user_wallet_entity_1.ProfileWallet, {
                    profile: { userId },
                });
                const providerWallet = await queryRunner.manager.findOneBy(user_wallet_entity_1.ProfileWallet, {
                    profile: { userId: bookingAidServiceProfile.profile.userId },
                });
                userWallet.pendingBalance =
                    Number(userWallet.pendingBalance) - Number(booking.totalAmount);
                providerWallet.earnedBalance =
                    Number(providerWallet.earnedBalance) + Number(booking.totalAmount);
                await queryRunner.manager.save(user_wallet_entity_1.ProfileWallet, [
                    userWallet,
                    providerWallet,
                ]);
                bookingAidServiceProfile.onSiteEarnings =
                    Number(bookingAidServiceProfile.onSiteEarnings) +
                        Number(booking.totalAmount);
                await queryRunner.manager.save(aid_service_profile_entity_1.AidServiceProfile, bookingAidServiceProfile);
            }
            const savedBooking = await queryRunner.manager.save(booking_entity_1.Booking, booking);
            await queryRunner.commitTransaction();
            updatedBooking = savedBooking;
            const notDto = {
                creator: profile,
                receivers: userType.isProvider ? [booking?.profile] : [booking.aidServiceProfile?.profile],
                context: notification_enum_1.NotificationContext.SERVICE_BOOKING,
                contextEntityId: bookingId,
                notificationEventType: notification_enum_1.NotificationEventType.AID_SERVICE_BOOKING_UPDATE,
                title: notification_enum_1.NotificationEventType.AID_SERVICE_BOOKING_UPDATE,
                description: `Booking Service has been confirmed as delivered by ${userType.isProvider ? "Provider" : "Client"}`,
                data: {
                    link: `${process.env.APP_URL}/booking/invoice?bi=${savedBooking.id}`,
                    'Composte Booking No': savedBooking.compositeBookingId,
                },
            };
            this.notificationService.sendNotification(notDto, { sendEmail: true, notifyAdmin: false });
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return updatedBooking;
        }
    }
    async getBooking(bookingId) {
        return this.dataSource.getRepository(booking_entity_1.Booking).findOne({
            where: { id: bookingId },
            relations: [
                'profile',
                'aidService',
                'aidServiceProfile',
                'aidServiceProfile.profile',
            ],
        });
    }
    async getBookingEligibleProfiles(dto) {
        const { bookingStartDateTime, aidServiceId, bookingEndDateTime } = dto;
        const oneHourAfterEndTime = new Date(new Date(bookingEndDateTime).getTime() + 1 * 60 * 60 * 1000).toISOString();
        const oneHourBeforeStartTime = new Date(new Date(bookingStartDateTime).getTime() - 1 * 60 * 60 * 1000).toISOString();
        const queryBuilder = this.dataSource
            .getRepository(user_entity_1.Profile)
            .createQueryBuilder('profile');
        queryBuilder
            .innerJoinAndSelect('profile.aidServiceProfiles', 'aidServiceProfiles')
            .innerJoinAndSelect('aidServiceProfiles.aidService', 'aidService')
            .leftJoin('aidServiceProfiles.bookings', 'bookings')
            .where('profile.isDeleted = false')
            .andWhere('aidServiceProfiles.aidServiceId = :aidServiceId', {
            aidServiceId,
        })
            .andWhere('((bookings.startDate) >= :oneHourAfterEndTime) || ((bookings.endDate) <= :oneHourBeforeStartTime) || bookings.id IS NULL', {
            oneHourAfterEndTime,
            oneHourBeforeStartTime,
        });
        return await queryBuilder.getMany();
    }
    async matchBookingWithServiceProfile(bookingData, config) {
        let updatedBooking;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const booking = typeof bookingData !== 'object'
                ? await queryRunner.manager.findOne(booking_entity_1.Booking, {
                    where: { id: bookingData },
                    relations: ['profile', 'aidService', 'aidServiceProfile'],
                })
                : bookingData;
            if (!booking)
                throw new common_1.NotFoundException('booking not found');
            if (!config.forceMatching && booking.aidServiceProfile)
                throw new common_1.BadRequestException('booking already matched with a provider');
            const eligibleProfiles = await this.getBookingEligibleProfiles({
                bookingStartDateTime: booking.startDate,
                bookingEndDateTime: booking.endDate,
                aidServiceId: booking.aidService.id,
            });
            if (eligibleProfiles?.length > 0) {
                const sortedProfiles = eligibleProfiles.sort((a, b) => {
                    a.score = this.scoreProfileToBooking(a, booking);
                    b.score = this.scoreProfileToBooking(b, booking);
                    return (b.score -
                        a.score);
                });
                booking.aidServiceProfile = sortedProfiles[0].aidServiceProfiles.find((aidProfile) => aidProfile.aidService.id === booking.aidService.id);
                booking.isMatched = true;
            }
            const savedBooking = await queryRunner.manager.save(booking_entity_1.Booking, {
                ...booking,
            });
            await queryRunner.commitTransaction();
            updatedBooking = savedBooking;
            const notDto = {
                creator: booking.profile,
                receivers: [booking.profile, booking.aidServiceProfile?.profile],
                context: notification_enum_1.NotificationContext.SERVICE_BOOKING,
                contextEntityId: savedBooking.id,
                notificationEventType: notification_enum_1.NotificationEventType.AID_SERVICE_BOOKING_PROVIDER_MATCH,
                title: notification_enum_1.NotificationEventType.AID_SERVICE_BOOKING_PROVIDER_MATCH,
                description: "The booking has been matched with a provider",
                avatar: savedBooking.aidServiceProfile?.mediaFile || booking.aidService?.avatar,
                data: {
                    link: `${process.env.APP_URL}/booking/invoice?bi=${savedBooking.id}`,
                    'Composte Booking No': savedBooking.compositeBookingId,
                },
            };
            this.notificationService.sendNotification(notDto, {
                notifyAdmin: true,
                sendEmail: true
            });
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return updatedBooking;
        }
    }
    async updateBooking(userId, bookingId, dto) {
        let updatedBooking;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const profile = await queryRunner.manager.findOneBy(user_entity_1.Profile, { userId });
            if (!profile)
                throw new common_1.NotFoundException("User profile not foud");
            const booking = await queryRunner.manager.findOne(booking_entity_1.Booking, {
                where: { id: bookingId },
                relations: ["profile", "aidService", "aidServiceProfile", "aidServiceProfile.profile"]
            });
            if (!booking)
                throw new common_1.NotFoundException("booking not found");
            if (booking.bookingStatus !== booking_enum_1.BookingStatus.PENDING)
                throw new common_1.BadRequestException("You can no longor update booking");
            const savedBooking = await queryRunner.manager.save(booking_entity_1.Booking, {
                ...booking, ...dto
            });
            await queryRunner.commitTransaction();
            updatedBooking = savedBooking;
            const notDto = {
                creator: profile,
                receivers: [profile, booking.aidServiceProfile?.profile],
                context: notification_enum_1.NotificationContext.SERVICE_BOOKING,
                contextEntityId: savedBooking.id,
                notificationEventType: notification_enum_1.NotificationEventType.AID_SERVICE_BOOKING_UPDATE,
                title: notification_enum_1.NotificationEventType.AID_SERVICE_BOOKING_UPDATE,
                description: dto.bookingStatus ? `Booking status has been updated to ${dto.bookingStatus} by ${profile.firstName}` : `Booking information has been updated by ${profile.firstName}, please re-check booking`,
                avatar: profile.avatar,
                data: {
                    link: `${process.env.APP_URL}/booking/invoice?bi=${savedBooking.id}`,
                    'Composte Booking No': savedBooking.compositeBookingId,
                },
            };
            this.notificationService.sendNotification(notDto, {
                notifyAdmin: false,
                sendEmail: true
            });
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return updatedBooking;
        }
    }
    scoreProfileToBooking(profile, booking) {
        let score = 0;
        const targetAidProfile = profile.aidServiceProfiles.find((aidProfile) => aidProfile.aidService.id === booking.aidService.id);
        if (profile.disabilityType)
            score += 5;
        const countryMatch = new RegExp(booking.locationAddress.country, 'i').test(targetAidProfile.locationAddress.country);
        const stateMatch = new RegExp(booking.locationAddress.state, 'i').test(targetAidProfile.locationAddress.state);
        const localityMatch = new RegExp(booking.locationAddress.locality, 'i').test(targetAidProfile.locationAddress.locality);
        const cityMatch = new RegExp(booking.locationAddress.city, 'i').test(targetAidProfile.locationAddress.city);
        if (countryMatch && stateMatch && localityMatch && cityMatch)
            score += 5;
        else if (countryMatch && stateMatch && localityMatch)
            score += 4;
        else if (countryMatch && stateMatch)
            score += 3;
        return score;
    }
    getQueryBuilder() {
        return this.dataSource
            .getRepository(booking_entity_1.Booking)
            .createQueryBuilder('booking')
            .leftJoinAndSelect('booking.profile', 'profile')
            .leftJoinAndSelect('booking.aidService', 'aidService')
            .leftJoin('booking.aidServiceProfile', 'aidServiceProfile')
            .leftJoin('aidServiceProfile.profile', 'aidServiceProfileProfile');
    }
    async getBookings(dto) {
        const { userId, aidServiceProfileId, aidServiceId, searchTerm, startDate, endDate, dDate, order, page, limit, ...queryFields } = dto;
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
            queryBuilder = (0, db_1.handleDateQuery)({ startDate, endDate, dDate, entityAlias: 'booking' }, queryBuilder, 'createdAt');
        }
        if (aidServiceId) {
            queryBuilder.andWhere(`aidService.id = :aidServiceId`, { aidServiceId });
        }
        if (aidServiceProfileId) {
            queryBuilder.andWhere(`aidServiceProfile.id = :aidServiceProfileId`, { aidServiceProfileId });
        }
        if (userId) {
            queryBuilder.andWhere("profile.userId = :userId OR aidServiceProfileProfile.userId = :userId", { userId });
        }
        if (searchTerm) {
            const searchFields = ['name', 'description'];
            let queryStr = `LOWER(aidService.name) LIKE :searchTerm`;
            searchFields.forEach((field) => {
                queryStr += ` OR LOWER(aidService.${field}) LIKE :searchTerm`;
            });
            ['email', 'userId', 'firstName', 'lastName'].forEach((field) => {
                queryStr += ` OR LOWER(profile.${field}) LIKE :searchTerm`;
            });
            ['email', 'userId', 'firstName', 'lastName'].forEach((field) => {
                queryStr += ` OR LOWER(aidServiceProfileProfile.${field}) LIKE :searchTerm`;
            });
            queryBuilder.andWhere(queryStr, {
                searchTerm: `%${searchTerm.toLowerCase().trim()}%`,
            });
        }
        const [data, total] = await queryBuilder
            .orderBy(`booking.${queryOrderBy}`, queryOrder)
            .skip((queryPage - 1) * queryLimit)
            .limit(queryLimit)
            .getManyAndCount();
        return { page: queryPage, limit: queryLimit, total, data };
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        notification_service_1.NotificationService])
], BookingService);
//# sourceMappingURL=booking.service.js.map