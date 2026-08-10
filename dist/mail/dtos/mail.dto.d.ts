export declare class MailDTO {
    to: string[];
    subject: string;
    template?: string;
    context?: ITemplateData & Record<string, unknown>;
}
export declare class ITemplateData {
    message?: string;
    receiverName?: string;
    entries?: {
        [key: string]: unknown;
    };
}
