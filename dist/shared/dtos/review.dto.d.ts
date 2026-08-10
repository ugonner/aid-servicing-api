import { ServiceType } from "../enums/review";
import { QueryDateDTO } from "./query-request.dto copy";
export declare class ReviewAndRatingDTO {
    id: number;
    rating?: number;
    review?: string;
    serviceType: ServiceType;
    serviceTypeEntityId?: number;
}
export declare class QueryReviewAndReportDTO extends QueryDateDTO {
    serviceType: ServiceType;
}
export declare class UpdateReportDTO {
    reportId: number;
    comment?: string;
    resolved?: boolean;
}
