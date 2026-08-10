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
exports.QueryCallRoomDTO = exports.CallRoomDTO = exports.CallMemberDTO = exports.JoinRoomDTO = exports.IInitUserConnectionDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const call_enum_1 = require("../enums/call.enum");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const query_request_dto_1 = require("./query-request.dto");
class IInitUserConnectionDTO {
}
exports.IInitUserConnectionDTO = IInitUserConnectionDTO;
class JoinRoomDTO {
}
exports.JoinRoomDTO = JoinRoomDTO;
class CallMemberDTO {
}
exports.CallMemberDTO = CallMemberDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CallMemberDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CallMemberDTO.prototype, "userName", void 0);
class CallRoomDTO {
}
exports.CallRoomDTO = CallRoomDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CallRoomDTO.prototype, "roomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(call_enum_1.RoomType),
    __metadata("design:type", String)
], CallRoomDTO.prototype, "roomType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CallRoomDTO.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CallRoomDTO.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => CallMemberDTO),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], CallRoomDTO.prototype, "callMembers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CallRoomDTO.prototype, "initiatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CallRoomDTO.prototype, "answered", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(call_enum_1.callPurpose),
    __metadata("design:type", String)
], CallRoomDTO.prototype, "callPurpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(call_enum_1.CallType),
    __metadata("design:type", String)
], CallRoomDTO.prototype, "callType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CallRoomDTO.prototype, "aidServiceProfileId", void 0);
class QueryCallRoomDTO extends query_request_dto_1.QueryRequestDTO {
}
exports.QueryCallRoomDTO = QueryCallRoomDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryCallRoomDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryCallRoomDTO.prototype, "aidServiceProfileId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryCallRoomDTO.prototype, "aidServiceId", void 0);
//# sourceMappingURL=call.dto.js.map