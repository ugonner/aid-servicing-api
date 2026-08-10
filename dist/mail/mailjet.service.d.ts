import { MailDTO } from './dtos/mail.dto';
export declare class MailjetService {
    private readonly mailjet;
    constructor();
    private compileTemplate;
    sendEmail(dto: MailDTO): Promise<any>;
}
