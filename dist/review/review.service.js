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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("../entities/review.entity");
const user_entity_1 = require("../entities/user.entity");
const aid_service_profile_entity_1 = require("../entities/aid-service-profile.entity");
const review_1 = require("../shared/enums/review");
const booking_entity_1 = require("../entities/booking.entity");
const call_entity_1 = require("../entities/call.entity");
const db_1 = require("../shared/helpers/db");
const notification_service_1 = require("../notifiction/notification.service");
const notification_enum_1 = require("../notifiction/enums/notification.enum");
let ReviewService = class ReviewService {
    constructor(dataSource, notificationService) {
        this.dataSource = dataSource;
        this.notificationService = notificationService;
    }
    async createRating(dto, userId) {
        let newReview;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const profile = await queryRunner.manager.findOneBy(user_entity_1.Profile, { userId });
            if (!profile)
                throw new common_1.BadRequestException("User profile not found");
            let aidServiceProfile;
            let entityOwner;
            if (dto.serviceType === review_1.ServiceType.BOOKING) {
                const booking = await queryRunner.manager.findOne(booking_entity_1.Booking, {
                    where: { id: dto.serviceTypeEntityId },
                    relations: ["aidServiceProfile", "aidServiceProfile.profile"]
                });
                if (!booking)
                    throw new common_1.NotFoundException("boooking not found");
                if (!booking.aidServiceProfile)
                    throw new common_1.BadRequestException("booking has not been matched with a provider yet");
                if (booking.aidServiceProfile.profile?.userId === userId)
                    throw new common_1.BadRequestException("This service is provided by you, You can not review your own service");
                aidServiceProfile = booking.aidServiceProfile;
                entityOwner = booking.aidServiceProfile.profile;
                booking.rating = dto.rating;
                booking.review = dto.review;
                await queryRunner.manager.save(booking_entity_1.Booking, { ...booking });
            }
            else if (dto.serviceType === review_1.ServiceType.CALL) {
                const callRoom = await queryRunner.manager.findOne(call_entity_1.CallRoom, {
                    where: { id: dto.serviceTypeEntityId },
                    relations: ["aidServiceProfile", "aidServiceProfile.profile"]
                });
                if (!callRoom)
                    throw new common_1.NotFoundException("Call room not found");
                aidServiceProfile = callRoom.aidServiceProfile;
                entityOwner = callRoom.aidServiceProfile.profile;
                callRoom.rating = dto.rating;
                callRoom.review = dto.review;
                await queryRunner.manager.save(call_entity_1.CallRoom, { ...callRoom });
            }
            if (!aidServiceProfile)
                throw new common_1.NotFoundException("Service profile not found");
            aidServiceProfile.averageRating = ((Number(aidServiceProfile.averageRating) * Number(aidServiceProfile.noOfRatings)) + Number(dto.rating)) / (Number(aidServiceProfile.noOfRatings) + 1);
            aidServiceProfile.noOfRatings = Number(aidServiceProfile.noOfRatings) + 1;
            await queryRunner.manager.save(aid_service_profile_entity_1.AidServiceProfile, { ...aidServiceProfile });
            const reviewData = queryRunner.manager.create(review_entity_1.ReviewAndRating, dto);
            reviewData.profileId = profile.id;
            const savedReview = await queryRunner.manager.save(review_entity_1.ReviewAndRating, reviewData);
            await queryRunner.commitTransaction();
            newReview = savedReview;
            const notDto = {
                creator: profile,
                receivers: [entityOwner, profile],
                context: notification_enum_1.NotificationContext.REVIEW_RATING,
                contextEntityId: savedReview.id,
                notificationEventType: notification_enum_1.NotificationEventType.REVIEW_AND_RATING_MADE,
                title: notification_enum_1.NotificationEventType.REVIEW_AND_RATING_MADE,
                description: "Review recorded",
                data: {
                    link: `${process.env.APP_URL}/review/single?rid=${savedReview.id}`
                }
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
            return newReview;
        }
    }
    async getReviews(dto) {
        const { searchTerm, startDate, endDate, dDate, order, page, limit, ...queryFields } = dto;
        const queryPage = page ? Number(page) : 1;
        const queryLimit = limit ? Number(limit) : 10;
        const queryOrder = order ? order.toUpperCase() : 'DESC';
        const queryOrderBy = "createdAt";
        let queryBuilder = this.dataSource.getRepository(review_entity_1.ReviewAndRating).createQueryBuilder("review");
        queryBuilder.leftJoinAndSelect("profile", "profile", "review.profileId = profile.id");
        if (dto.serviceType === review_1.ServiceType.BOOKING) {
            queryBuilder.leftJoinAndSelect("booking", "booking", "review.serviceEntityId = booking.id")
                .leftJoinAndSelect("booking.aidServiceProfile", "aidServiceProfile");
        }
        else if (dto.serviceType === review_1.ServiceType.CALL) {
            queryBuilder.leftJoinAndSelect("call_room", "callRoom", "review.serviceEntityId = call_room.id")
                .leftJoinAndSelect("callRoom.aidServiceProfile", "aidServiceProfile");
        }
        queryBuilder.leftJoinAndSelect("aidServiceProfile.profile", "serviceProfile");
        queryBuilder.where("booking.isDeleted != :isDeleted", { isDeleted: true });
        if (queryFields) {
            Object.keys(queryFields).forEach((field) => {
                queryBuilder.andWhere(`review.${field} = :value`, {
                    value: queryFields[field],
                });
            });
        }
        if (startDate || endDate || dDate) {
            queryBuilder = (0, db_1.handleDateQuery)({ startDate, endDate, dDate, entityAlias: 'review' }, queryBuilder, 'createdAt');
        }
        if (searchTerm) {
            const searchFields = ["userId", "firstName", "lastName"];
            let queryStr = `LOWER(serviceProfile.email) LIKE :searchTerm`;
            searchFields.forEach((field) => {
                queryStr += ` OR LOWER(serviceProfile.${field}) LIKE :searchTerm`;
            });
            ["email", "userId", "firstName", "lastName"].forEach((field) => {
                queryStr += ` OR LOWER(profile.${field}) LIKE :searchTerm`;
            });
            ["name"].forEach((field) => {
                queryStr += ` OR LOWER(aidServiceProfile.${field}) LIKE :searchTerm`;
            });
            queryBuilder.andWhere(queryStr, {
                searchTerm: `%${searchTerm.toLowerCase().trim()}%`,
            });
        }
        const [data, total] = await queryBuilder
            .orderBy(`review.${queryOrderBy}`, queryOrder)
            .skip((queryPage - 1) * queryLimit)
            .limit(queryLimit)
            .getManyAndCount();
        return { page: queryPage, limit: queryLimit, total, data };
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        notification_service_1.NotificationService])
], ReviewService);
//# sourceMappingURL=review.service.js.map