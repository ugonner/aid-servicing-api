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
exports.QueryAidServiceProfileDTO = exports.QueryAidServiceDTO = exports.VerifyAidServiceProfileDTO = exports.AidServiceProfileApplicationDTO = exports.ILocationAddressDTO = exports.ISocialMediaLinksDTO = exports.RequestAidServiceDTO = exports.UpdateUserAidServiceDTO = exports.AidServiceDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const aid_service_enum_1 = require("../enums/aid-service.enum");
const class_transformer_1 = require("class-transformer");
const tag_dto_1 = require("./tag.dto");
const query_request_dto_copy_1 = require("./query-request.dto copy");
class AidServiceDTO {
}
exports.AidServiceDTO = AidServiceDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AidServiceDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AidServiceDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AidServiceDTO.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], AidServiceDTO.prototype, "audioCallRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], AidServiceDTO.prototype, "videoCallRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], AidServiceDTO.prototype, "onSiteRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => tag_dto_1.TagDTO),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AidServiceDTO.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AidServiceDTO.prototype, "clusterIds", void 0);
class UpdateUserAidServiceDTO {
}
exports.UpdateUserAidServiceDTO = UpdateUserAidServiceDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateUserAidServiceDTO.prototype, "id", void 0);
class RequestAidServiceDTO {
}
exports.RequestAidServiceDTO = RequestAidServiceDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RequestAidServiceDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestAidServiceDTO.prototype, "roomId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RequestAidServiceDTO.prototype, "name", void 0);
class ISocialMediaLinksDTO {
}
exports.ISocialMediaLinksDTO = ISocialMediaLinksDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ISocialMediaLinksDTO.prototype, "facebook", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ISocialMediaLinksDTO.prototype, "x", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ISocialMediaLinksDTO.prototype, "linkedIn", void 0);
class ILocationAddressDTO {
}
exports.ILocationAddressDTO = ILocationAddressDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ILocationAddressDTO.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ILocationAddressDTO.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ILocationAddressDTO.prototype, "locality", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ILocationAddressDTO.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ILocationAddressDTO.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ILocationAddressDTO.prototype, "landmark", void 0);
class AidServiceProfileApplicationDTO {
}
exports.AidServiceProfileApplicationDTO = AidServiceProfileApplicationDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AidServiceProfileApplicationDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AidServiceProfileApplicationDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], AidServiceProfileApplicationDTO.prototype, "aidServiceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AidServiceProfileApplicationDTO.prototype, "businessDocumentUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AidServiceProfileApplicationDTO.prototype, "mediaFile", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ISocialMediaLinksDTO),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ISocialMediaLinksDTO)
], AidServiceProfileApplicationDTO.prototype, "socialMediaLinks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ILocationAddressDTO),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ILocationAddressDTO)
], AidServiceProfileApplicationDTO.prototype, "locationAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AidServiceProfileApplicationDTO.prototype, "contactPhoneNumber", void 0);
class VerifyAidServiceProfileDTO {
}
exports.VerifyAidServiceProfileDTO = VerifyAidServiceProfileDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(aid_service_enum_1.AidServiceProfileVerificationStatus),
    __metadata("design:type", String)
], VerifyAidServiceProfileDTO.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], VerifyAidServiceProfileDTO.prototype, "verificationComment", void 0);
class QueryAidServiceDTO extends query_request_dto_copy_1.QueryDateDTO {
}
exports.QueryAidServiceDTO = QueryAidServiceDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAidServiceDTO.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAidServiceDTO.prototype, "clusterIds", void 0);
class QueryAidServiceProfileDTO extends query_request_dto_copy_1.QueryDateDTO {
}
exports.QueryAidServiceProfileDTO = QueryAidServiceProfileDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAidServiceProfileDTO.prototype, "aidServiceProfileId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAidServiceProfileDTO.prototype, "aidServiceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(aid_service_enum_1.AidServiceProfileVerificationStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAidServiceProfileDTO.prototype, "verificationStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAidServiceProfileDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAidServiceProfileDTO.prototype, "clusterIds", void 0);
//# sourceMappingURL=aid-service.dto.js.map