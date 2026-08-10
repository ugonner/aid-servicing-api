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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const booking_entity_1 = require("../entities/booking.entity");
const call_entity_1 = require("../entities/call.entity");
const report_entity_1 = require("../entities/report.entity");
const review_1 = require("../shared/enums/review");
const db_1 = require("../shared/helpers/db");
const notification_service_1 = require("../notifiction/notification.service");
const notification_enum_1 = require("../notifiction/enums/notification.enum");
const report_comment_entity_1 = require("../entities/report-comment.entity");
let ReportService = class ReportService {
    constructor(dataSource, notificationService) {
        this.dataSource = dataSource;
        this.notificationService = notificationService;
    }
    async createReport(dto, userId) {
        let newReport;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const profile = await queryRunner.manager.findOneBy(user_entity_1.Profile, { userId });
            if (!profile)
                throw new common_1.BadRequestException('User profile not found');
            let aidServiceProfile;
            let entityOwner;
            if (dto.serviceType === review_1.ServiceType.BOOKING) {
                const booking = await queryRunner.manager.findOne(booking_entity_1.Booking, {
                    where: { id: dto.serviceTypeEntityId },
                    relations: ['aidServiceProfile', 'aidServiceProfile.profile'],
                });
                if (!booking)
                    throw new common_1.NotFoundException('boooking not found');
                aidServiceProfile = booking.aidServiceProfile;
                entityOwner = booking.aidServiceProfile.profile;
            }
            else if (dto.serviceType === review_1.ServiceType.CALL) {
                const callRoom = await queryRunner.manager.findOne(call_entity_1.CallRoom, {
                    where: { id: dto.serviceTypeEntityId },
                    relations: ['aidServiceProfile', 'aidServiceProfile.profile'],
                });
                if (!callRoom)
                    throw new common_1.NotFoundException('Call room not found');
                aidServiceProfile = callRoom.aidServiceProfile;
                entityOwner = callRoom.aidServiceProfile.profile;
            }
            const reportData = queryRunner.manager.create(report_entity_1.Report, dto);
            reportData.profile = profile;
            reportData.entityOwner = entityOwner;
            const savedReport = await queryRunner.manager.save(report_entity_1.Report, reportData);
            await queryRunner.commitTransaction();
            newReport = savedReport;
            const notDto = {
                creator: profile,
                receivers: [entityOwner, profile],
                context: notification_enum_1.NotificationContext.REPORT,
                contextEntityId: savedReport.id,
                notificationEventType: notification_enum_1.NotificationEventType.REPORT,
                title: notification_enum_1.NotificationEventType.REPORT,
                description: 'Report recorded successfully, being reviewed',
                data: {
                    link: `${process.env.APP_URL}/report/report?rid=${savedReport.id}`,
                    by: profile.firstName,
                    entity: dto.serviceType,
                },
            };
            this.notificationService.sendNotification(notDto, {
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
            return newReport;
        }
    }
    async updateReport(dto, userId) {
        let updatedReport;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const profile = await queryRunner.manager.findOneBy(user_entity_1.Profile, { userId });
            if (!profile)
                throw new common_1.NotFoundException('User profile not found');
            const report = await queryRunner.manager.findOneBy(report_entity_1.Report, {
                id: dto.reportId,
            });
            if (!report)
                throw new common_1.NotFoundException('Report not found');
            report.resolvedById = profile.id;
            if (dto.comment)
                report.comment = dto.comment;
            if (dto.resolved == false)
                report.isResolved = false;
            else if (dto.resolved == true)
                report.isResolved = true;
            await queryRunner.manager.save(report_entity_1.Report, { ...report });
            await queryRunner.commitTransaction();
            updatedReport = report;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return updatedReport;
        }
    }
    async getReports(dto) {
        const { searchTerm, startDate, endDate, dDate, order, page, limit, ...queryFields } = dto;
        const queryPage = page ? Number(page) : 1;
        const queryLimit = limit ? Number(limit) : 10;
        const queryOrder = order ? order.toUpperCase() : 'DESC';
        const queryOrderBy = 'createdAt';
        let queryBuilder = this.dataSource
            .getRepository(report_entity_1.Report)
            .createQueryBuilder('report');
        queryBuilder.leftJoinAndSelect('profile', 'profile', 'report.profileId = profile.id');
        queryBuilder.leftJoin('profile', 'adminProfile', 'report.resolvedById = profile.id')
            .leftJoinAndSelect("report.entityOwner", "entityOwner");
        queryBuilder.where('booking.isDeleted != :isDeleted', { isDeleted: true });
        if (queryFields) {
            Object.keys(queryFields).forEach((field) => {
                queryBuilder.andWhere(`report.${field} = :value`, {
                    value: queryFields[field],
                });
            });
        }
        if (startDate || endDate || dDate) {
            queryBuilder = (0, db_1.handleDateQuery)({ startDate, endDate, dDate, entityAlias: 'report' }, queryBuilder, 'createdAt');
        }
        if (searchTerm) {
            const searchFields = ['userId', 'firstName', 'lastName'];
            let queryStr = `LOWER(serviceProfile.email) LIKE :searchTerm`;
            searchFields.forEach((field) => {
                queryStr += ` OR LOWER(serviceProfile.${field}) LIKE :searchTerm`;
            });
            ['email', 'userId', 'firstName', 'lastName'].forEach((field) => {
                queryStr += ` OR LOWER(profile.${field}) LIKE :searchTerm`;
            });
            ['name'].forEach((field) => {
                queryStr += ` OR LOWER(aidServiceProfile.${field}) LIKE :searchTerm`;
            });
            queryBuilder.andWhere(queryStr, {
                searchTerm: `%${searchTerm.toLowerCase().trim()}%`,
            });
        }
        const [data, total] = await queryBuilder
            .orderBy(`report.${queryOrderBy}`, queryOrder)
            .skip((queryPage - 1) * queryLimit)
            .limit(queryLimit)
            .getManyAndCount();
        return { page: queryPage, limit: queryLimit, total, data };
    }
    async commentReport(reportId, userId, dto) {
        let newReportComment;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const profile = await queryRunner.manager.findOneBy(user_entity_1.Profile, { userId });
            if (!profile)
                throw new common_1.NotFoundException("Profile not found");
            const report = await queryRunner.manager.findOne(report_entity_1.Report, {
                where: { id: reportId },
                relations: ["entityOwner"]
            });
            if (!report)
                throw new common_1.NotFoundException("Report not found");
            const reportComment = queryRunner.manager.create(report_comment_entity_1.ReportComment, {
                comment: dto.comment,
                profile,
                report
            });
            const savedReportComment = await queryRunner.manager.save(report_comment_entity_1.ReportComment, reportComment);
            await queryRunner.commitTransaction();
            newReportComment = savedReportComment;
            const notDto = {
                creator: profile,
                receivers: [report.entityOwner],
                context: notification_enum_1.NotificationContext.REPORT,
                contextEntityId: reportId,
                notificationEventType: notification_enum_1.NotificationEventType.REPORT_COMMENT,
                title: notification_enum_1.NotificationEventType.REPORT_COMMENT,
                description: `a response has been made to repor`,
                avatar: profile.avatar,
                data: {
                    "link": `${process.env.APP_URL}/report/report?rid=${reportId}`,
                    "by": profile.firstName
                }
            };
            this.notificationService.sendNotification(notDto, {
                sendEmail: true,
                notifyAdmin: true
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
            return newReportComment;
        }
    }
    async resolveReport(reportId, userId, dto) {
        let updatedReport;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const profile = await queryRunner.manager.findOneBy(user_entity_1.Profile, { userId });
            if (!profile)
                throw new common_1.NotFoundException("Profile not found");
            const report = await queryRunner.manager.findOne(report_entity_1.Report, {
                where: { id: reportId },
                relations: ["entityOwner"]
            });
            if (!report)
                throw new common_1.NotFoundException("Report not found");
            report.isResolved = dto.isResolved;
            report.resolvedById = profile.id;
            await queryRunner.manager.save(report_entity_1.Report, { ...report });
            await queryRunner.commitTransaction();
            updatedReport = report;
            this.commentReport(reportId, userId, { comment: notification_enum_1.NotificationEventType.REPORT_RESOLUTION })
                .catch((err) => console.log("Error recording resolution comment", err));
            const notDto = {
                creator: profile,
                receivers: [report.entityOwner],
                context: notification_enum_1.NotificationContext.REPORT,
                contextEntityId: reportId,
                notificationEventType: notification_enum_1.NotificationEventType.REPORT_RESOLUTION,
                title: notification_enum_1.NotificationEventType.REPORT_RESOLUTION,
                description: `Report resolved`,
                avatar: profile.avatar,
                data: {
                    "link": `${process.env.APP_URL}/report/report?rid=${reportId}`,
                    "by": profile.firstName
                }
            };
            this.notificationService.sendNotification(notDto, {
                sendEmail: true,
                notifyAdmin: true
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
            return updatedReport;
        }
    }
    async getReportComments(reportId, dto) {
        const { page, limit } = dto;
        const queryPage = page ? Number(page) : 1;
        const queryLimit = limit ? Number(limit) : 10;
        const [data, total] = await this.dataSource.getRepository(report_comment_entity_1.ReportComment).findAndCount({
            where: { report: { id: reportId } },
            skip: queryPage - 1,
            take: queryLimit,
            order: { createdAt: "DESC" },
            relations: ["profile"]
        });
        return { page: queryPage, limit: queryLimit, total, data };
    }
    async getReport(reprotId) {
        return this.dataSource.getRepository(report_entity_1.Report).findOne({
            where: { id: reprotId },
            relations: ["entityOwner", "profile"]
        });
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        notification_service_1.NotificationService])
], ReportService);
//# sourceMappingURL=report.service.js.map