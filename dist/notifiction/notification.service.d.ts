import { DataSource } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { NotificationDto } from './dtos/notification.dto';
import { Notification } from '../entities/notification.entity';
export declare class NotificationService {
    private dataSource;
    private mailService;
    constructor(dataSource: DataSource, mailService: MailService);
    createNotification(dto: NotificationDto): Promise<Notification[]>;
    sendEmailFromNotification(dto: NotificationDto, templatePath?: string): Promise<void>;
    sendNotification(dto: NotificationDto, config: {
        sendEmail: boolean;
        emailTemplate?: string;
        notifyAdmin: boolean;
    }): Promise<void>;
}
