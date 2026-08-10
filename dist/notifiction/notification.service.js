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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const mail_service_1 = require("../mail/mail.service");
const notification_entity_1 = require("../entities/notification.entity");
let NotificationService = class NotificationService {
    constructor(dataSource, mailService) {
        this.dataSource = dataSource;
        this.mailService = mailService;
    }
    async createNotification(dto) {
        let newNotifications;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const { receivers, ...notificationDto } = dto;
            const notificationDatas = receivers.map((receiver) => {
                return queryRunner.manager.create(notification_entity_1.Notification, {
                    ...notificationDto,
                    receiver,
                });
            });
            const savedNotifications = await queryRunner.manager.save(notification_entity_1.Notification, notificationDatas);
            await queryRunner.commitTransaction();
            newNotifications = savedNotifications;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return newNotifications;
        }
    }
    async sendEmailFromNotification(dto, templatePath) {
        const mailDto = {
            to: dto.receivers.map((recv) => recv?.email),
            subject: dto.notificationEventType,
            template: templatePath,
            context: {
                message: dto.description,
                entries: dto.data,
            },
        };
        await this.mailService.sendEmail(mailDto);
    }
    async sendNotification(dto, config) {
        try {
            if (config.sendEmail)
                await this.sendEmailFromNotification(dto, config.emailTemplate);
            await this.createNotification(dto);
        }
        catch (error) {
            console.log(`Error sending notifications: ${dto.notificationEventType}`, error.message);
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        mail_service_1.MailService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map