import { QueryRequestDTO } from './query-request.dto';
export declare class AuthDTO {
    email: string;
    phoneNumber?: string;
    password: string;
}
export declare class OtpAuthDTO {
    otp?: number;
    email?: string;
    phoneNumber?: string;
    password?: string;
}
export declare class QueryAuthDTO extends QueryRequestDTO {
}
