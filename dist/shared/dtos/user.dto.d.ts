import { DisabilityType, Gender } from "../enums/user.enum";
import { AuthDTO } from "./auth.dto";
import { QueryDateDTO } from "./query-request.dto copy";
export declare class UserProfileDTO extends AuthDTO {
    firstName?: string;
    disabilityType?: DisabilityType;
    lastName?: string;
    avatar?: string;
    gender?: Gender;
}
export declare class UpdateProfileDTO {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    gender?: Gender;
}
export declare class QueryUserDTO extends QueryDateDTO {
    clusterIds: string;
}
