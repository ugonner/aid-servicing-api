import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../shared/guards/jwt.guards';
import { User } from '../shared/guards/decorators/user.decorator';
import { QueryReviewAndReportDTO, ReviewAndRatingDTO, UpdateReportDTO } from '../shared/dtos/review.dto';
import { ApiResponse } from '../shared/helpers/apiresponse';
import { ReportService } from './report.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("report")
@Controller('report')
export class ReviewController {
    constructor(
        private reportService: ReportService
    ){}

    @Post()
    @UseGuards(JwtGuard)
    async createReview(
        @User("userId") userId: string,
        @Body() payload: ReviewAndRatingDTO
    ){
        const res = await this.reportService.createReport(payload, userId);
        return ApiResponse.success("review created successfully", res);
    }

    @Put("update")
    @UseGuards(JwtGuard)
    async commentReport(
        @Body() payload: UpdateReportDTO,
        @User("userId") userId: string
    ){
        const res = await this.reportService.updateReport(payload, userId);
        return ApiResponse.success("Report commented successfully", res)
    }

    @Get()
    async getReports(
        @Query() payload: QueryReviewAndReportDTO
    ){
        const res = await this.reportService.getReports(payload);
        return ApiResponse.success("reports fetched successfully", res);
    }
}
