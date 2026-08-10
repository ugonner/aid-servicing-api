import { MailerService } from '@nestjs-modules/mailer';
import { MailDTO } from './dtos/mail.dto';
import { MailjetService } from './mailjet.service';
export declare class MailService {
    private readonly mailerService;
    private mailjetService;
    constructor(mailerService: MailerService, mailjetService: MailjetService);
    sendEmail(dto: MailDTO): Promise<void>;
}
