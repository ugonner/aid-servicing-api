import { ServiceType } from "../shared/enums/review";
import { Profile } from "./user.entity";
export declare class Report {
    id: number;
    rating: number;
    review: string;
    serviceType: ServiceType;
    serviceTypeEntityId: number;
    profileId: number;
    isResolved: boolean;
    resolvedById: number;
    profile: Profile;
    entityOwner: Profile;
    comment?: string;
    createdAt: Date;
    isDeleted: boolean;
}
