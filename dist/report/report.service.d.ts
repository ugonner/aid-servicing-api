import { DataSource } from 'typeorm';
import { Report } from '../entities/report.entity';
import { IQueryResult } from '../shared/interfaces/api-response.interface';
import { QueryReviewAndReportDTO, ReviewAndRatingDTO, UpdateReportDTO } from '../shared/dtos/review.dto';
import { NotificationService } from '../notifiction/notification.service';
import { ReportCommentDTO, ResolveReportDTO } from './dtos/report.sto';
import { ReportComment } from '../entities/report-comment.entity';
import { QueryRequestDTO } from '../shared/dtos/query-request.dto';
export declare class ReportService {
    private dataSource;
    private notificationService;
    constructor(dataSource: DataSource, notificationService: NotificationService);
    createReport(dto: ReviewAndRatingDTO, userId: string): Promise<Report>;
    updateReport(dto: UpdateReportDTO, userId: string): Promise<Report>;
    getReports(dto: QueryReviewAndReportDTO): Promise<IQueryResult<Report>>;
    commentReport(reportId: number, userId: string, dto: ReportCommentDTO): Promise<ReportComment>;
    resolveReport(reportId: number, userId: string, dto: ResolveReportDTO): Promise<Report>;
    getReportComments(reportId: number, dto: QueryRequestDTO): Promise<IQueryResult<ReportComment>>;
    getReport(reprotId: number): Promise<Report>;
}
