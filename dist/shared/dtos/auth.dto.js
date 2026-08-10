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
exports.QueryAuthDTO = exports.OtpAuthDTO = exports.AuthDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const query_request_dto_1 = require("./query-request.dto");
class AuthDTO {
}
exports.AuthDTO = AuthDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Please enter a valid email address' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.Length)(11, 16),
    (0, class_validator_1.IsPhoneNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Length)(8, 20, { message: 'Password must be between 8 and 20 characters' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please enter a password' }),
    __metadata("design:type", String)
], AuthDTO.prototype, "password", void 0);
class OtpAuthDTO {
}
exports.OtpAuthDTO = OtpAuthDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OtpAuthDTO.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Please enter a valid email address' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OtpAuthDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.Length)(11, 16),
    (0, class_validator_1.IsPhoneNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OtpAuthDTO.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.Length)(8, 20, { message: 'Password must be between 8 and 20 characters' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OtpAuthDTO.prototype, "password", void 0);
class QueryAuthDTO extends query_request_dto_1.QueryRequestDTO {
}
exports.QueryAuthDTO = QueryAuthDTO;
//# sourceMappingURL=auth.dto.js.map