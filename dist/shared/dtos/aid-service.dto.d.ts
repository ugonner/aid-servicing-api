import { AidServiceProfileVerificationStatus } from '../enums/aid-service.enum';
import { TagDTO } from './tag.dto';
import { QueryDateDTO } from './query-request.dto copy';
export declare class AidServiceDTO {
    id?: number;
    name: string;
    description?: string;
    avatar?: string;
    audioCallRate?: number;
    videoCallRate?: number;
    onSiteRate?: number;
    tags: TagDTO[];
    clusterIds?: number[];
}
export declare class UpdateUserAidServiceDTO {
    id: number;
}
export declare class RequestAidServiceDTO {
    id: number;
    roomId: string;
    name?: string;
}
export declare class ISocialMediaLinksDTO {
    facebook?: string;
    x: string;
    linkedIn?: string;
}
export declare class ILocationAddressDTO {
    street: string;
    city: string;
    locality?: string;
    state?: string;
    country?: string;
    landmark?: string;
}
export declare class AidServiceProfileApplicationDTO {
    name?: string;
    description?: string;
    aidServiceId: number;
    businessDocumentUrl: string;
    mediaFile: string;
    socialMediaLinks: ISocialMediaLinksDTO;
    locationAddress: ILocationAddressDTO;
    contactPhoneNumber?: string;
}
export declare class VerifyAidServiceProfileDTO {
    verificationStatus: AidServiceProfileVerificationStatus;
    verificationComment: string;
}
export declare class QueryAidServiceDTO extends QueryDateDTO {
    tags?: string;
    clusterIds?: string;
}
export declare class QueryAidServiceProfileDTO extends QueryDateDTO {
    aidServiceProfileId?: string;
    aidServiceId?: string;
    verificationStatus?: AidServiceProfileVerificationStatus;
    userId?: string;
    clusterIds?: string;
}
export interface ICallAidServiceProfileDTO {
    id: number;
    verificationStatus: AidServiceProfileVerificationStatus;
    aidService: AidServiceDTO;
    isDeleted: boolean;
}
