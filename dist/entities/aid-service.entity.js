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
exports.AidService = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const aid_service_profile_entity_1 = require("./aid-service-profile.entity");
const aid_service_tag_entity_1 = require("./aid-service-tag.entity");
const booking_entity_1 = require("./booking.entity");
const aid_service_cluster_entity_1 = require("./aid-service-cluster.entity");
let AidService = class AidService {
};
exports.AidService = AidService;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AidService.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AidService.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AidService.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AidService.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], AidService.prototype, "noOfAidServiceProfiles", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AidService.prototype, "audioCallRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AidService.prototype, "videoCallRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AidService.prototype, "onSiteRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AidService.prototype, "virtualServiceRate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => aid_service_profile_entity_1.AidServiceProfile, (aidServiceProfile) => aidServiceProfile.aidService),
    __metadata("design:type", Array)
], AidService.prototype, "aidServiceProfiles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => aid_service_tag_entity_1.AidServiceTag, (aidServiceTag) => aidServiceTag.aidService),
    __metadata("design:type", Array)
], AidService.prototype, "aidServiceTags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (booking) => booking.aidService),
    __metadata("design:type", Array)
], AidService.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Profile),
    __metadata("design:type", user_entity_1.Profile)
], AidService.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => aid_service_cluster_entity_1.AidServiceCluster, (aidServiceCluster) => aidServiceCluster.aidService),
    __metadata("design:type", Array)
], AidService.prototype, "aidServiceClusters", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AidService.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], AidService.prototype, "isDeleted", void 0);
exports.AidService = AidService = __decorate([
    (0, typeorm_1.Entity)()
], AidService);
//# sourceMappingURL=aid-service.entity.js.map