import { ServiceType } from "../shared/enums/review";
export declare class ReviewAndRating {
    id: number;
    rating: number;
    review: string;
    serviceType: ServiceType;
    serviceTypeEntityId: number;
    profileId: number;
    createdAt: Date;
    isDeleted: boolean;
}
