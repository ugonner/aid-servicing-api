import { QueryReviewAndReportDTO, ReviewAndRatingDTO, UpdateReportDTO } from '../shared/dtos/review.dto';
import { ReportService } from './report.service';
import { ReportCommentDTO, ResolveReportDTO } from './dtos/report.sto';
import { QueryRequestDTO } from '../shared/dtos/query-request.dto';
export declare class ReportController {
    private reportService;
    constructor(reportService: ReportService);
    createReview(userId: string, payload: ReviewAndRatingDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/report.entity").Report>>;
    commentReport(payload: UpdateReportDTO, userId: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/report.entity").Report>>;
    commentReportComment(payload: ReportCommentDTO, userId: string, reportId: number): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/report-comment.entity").ReportComment>>;
    resolveReportComment(payload: ResolveReportDTO, userId: string, reportId: number): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/report.entity").Report>>;
    getReports(payload: QueryReviewAndReportDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../shared/interfaces/api-response.interface").IQueryResult<import("../entities/report.entity").Report>>>;
    getReportComment(reportId: number, payload: QueryRequestDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../shared/interfaces/api-response.interface").IQueryResult<import("../entities/report-comment.entity").ReportComment>>>;
    getReport(reportId: number): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/report.entity").Report>>;
}
