"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReportDTO = exports.QueryReviewAndReportDTO = exports.ReviewAndRatingDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const review_1 = require("../enums/review");
const query_request_dto_copy_1 = require("./query-request.dto copy");
class ReviewAndRatingDTO {
}
exports.ReviewAndRatingDTO = ReviewAndRatingDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ReviewAndRatingDTO.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReviewAndRatingDTO.prototype, "review", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(review_1.ServiceType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReviewAndRatingDTO.prototype, "serviceType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ReviewAndRatingDTO.prototype, "serviceTypeEntityId", void 0);
class QueryReviewAndReportDTO extends query_request_dto_copy_1.QueryDateDTO {
}
exports.QueryReviewAndReportDTO = QueryReviewAndReportDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(review_1.ServiceType),
    __metadata("design:type", String)
], QueryReviewAndReportDTO.prototype, "serviceType", void 0);
class UpdateReportDTO {
}
exports.UpdateReportDTO = UpdateReportDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateReportDTO.prototype, "reportId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReportDTO.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateReportDTO.prototype, "resolved", void 0);
//# sourceMappingURL=review.dto.js.map