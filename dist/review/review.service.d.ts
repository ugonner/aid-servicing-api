import { DataSource } from 'typeorm';
import { QueryReviewAndReportDTO, ReviewAndRatingDTO } from '../shared/dtos/review.dto';
import { ReviewAndRating } from '../entities/review.entity';
import { IQueryResult } from '../shared/interfaces/api-response.interface';
import { NotificationService } from '../notifiction/notification.service';
export declare class ReviewService {
    private dataSource;
    private notificationService;
    constructor(dataSource: DataSource, notificationService: NotificationService);
    createRating(dto: ReviewAndRatingDTO, userId: string): Promise<ReviewAndRating>;
    getReviews(dto: QueryReviewAndReportDTO): Promise<IQueryResult<ReviewAndRating>>;
}
