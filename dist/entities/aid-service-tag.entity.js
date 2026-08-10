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
exports.AidServiceTag = void 0;
const typeorm_1 = require("typeorm");
const tag_entity_1 = require("./tag.entity");
const aid_service_entity_1 = require("./aid-service.entity");
let AidServiceTag = class AidServiceTag {
};
exports.AidServiceTag = AidServiceTag;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AidServiceTag.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tag_entity_1.Tag, (tag) => tag.aidServiceTags),
    __metadata("design:type", tag_entity_1.Tag)
], AidServiceTag.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => aid_service_entity_1.AidService, (aidService) => aidService.aidServiceTags),
    __metadata("design:type", aid_service_entity_1.AidService)
], AidServiceTag.prototype, "aidService", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AidServiceTag.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AidServiceTag.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], AidServiceTag.prototype, "isDeleted", void 0);
exports.AidServiceTag = AidServiceTag = __decorate([
    (0, typeorm_1.Entity)()
], AidServiceTag);
//# sourceMappingURL=aid-service-tag.entity.js.map