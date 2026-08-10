import { ReviewService } from './review.service';
import { QueryReviewAndReportDTO, ReviewAndRatingDTO } from '../shared/dtos/review.dto';
export declare class ReviewController {
    private reviewService;
    constructor(reviewService: ReviewService);
    createReview(userId: string, payload: ReviewAndRatingDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/review.entity").ReviewAndRating>>;
    getReviews(payload: QueryReviewAndReportDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../shared/interfaces/api-response.interface").IQueryResult<import("../entities/review.entity").ReviewAndRating>>>;
}
