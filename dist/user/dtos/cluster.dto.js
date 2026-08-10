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
exports.ManageUserClustersDTO = exports.ManageUserClusterOptionDTO = exports.ClusterDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const cluster_enum_1 = require("../enums/cluster.enum");
const class_transformer_1 = require("class-transformer");
class ClusterDTO {
}
exports.ClusterDTO = ClusterDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClusterDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClusterDTO.prototype, "description", void 0);
class ManageUserClusterOptionDTO {
}
exports.ManageUserClusterOptionDTO = ManageUserClusterOptionDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(cluster_enum_1.AddOrRemoveAction),
    __metadata("design:type", String)
], ManageUserClusterOptionDTO.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ManageUserClusterOptionDTO.prototype, "override", void 0);
class ManageUserClustersDTO {
}
exports.ManageUserClustersDTO = ManageUserClustersDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], ManageUserClustersDTO.prototype, "clusterIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ManageUserClusterOptionDTO),
    __metadata("design:type", ManageUserClusterOptionDTO)
], ManageUserClustersDTO.prototype, "options", void 0);
//# sourceMappingURL=cluster.dto.js.map