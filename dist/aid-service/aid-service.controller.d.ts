import { AidServiceService } from './aid-service.service';
import { AidServiceDTO, AidServiceProfileApplicationDTO, QueryAidServiceDTO, QueryAidServiceProfileDTO, UpdateUserAidServiceDTO, VerifyAidServiceProfileDTO } from '../shared/dtos/aid-service.dto';
export declare class AidServiceController {
    private aidServiceService;
    constructor(aidServiceService: AidServiceService);
    createAidService(payload: AidServiceDTO, userId: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/aid-service.entity").AidService>>;
    updateAidService(payload: UpdateUserAidServiceDTO, action: "add" | "remove", userId: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/aid-service-profile.entity").AidServiceProfile>>;
    editAidService(aidServiceId: number, payload: AidServiceDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/aid-service.entity").AidService>>;
    createAidServiceProfileApplication(payload: AidServiceProfileApplicationDTO, userId: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/aid-service-profile.entity").AidServiceProfile>>;
    updateAidServiceProfileApplication(payload: AidServiceProfileApplicationDTO, userId: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/aid-service-profile.entity").AidServiceProfile>>;
    updateAidServiceProfileApplicationStatus(payload: VerifyAidServiceProfileDTO, aidServiceProfileId: number, userId: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/aid-service-profile.entity").AidServiceProfile>>;
    getAidServiceProfiles(payload: QueryAidServiceProfileDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../shared/interfaces/api-response.interface").IQueryResult<import("../entities/aid-service-profile.entity").AidServiceProfile>>>;
    getTags(): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/tag.entity").Tag[]>>;
    getAidServices(payload: QueryAidServiceDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../shared/interfaces/api-response.interface").IQueryResult<import("../entities/aid-service.entity").AidService>>>;
    getAidServiceProfile(aidServiceProfileId: number): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/aid-service-profile.entity").AidServiceProfile>>;
    getAidService(aidServiceId: number): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/aid-service.entity").AidService>>;
}
