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
exports.AidServiceProfile = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const call_entity_1 = require("./call.entity");
const aid_service_enum_1 = require("../shared/enums/aid-service.enum");
const aid_service_entity_1 = require("./aid-service.entity");
const aid_service_dto_1 = require("../shared/dtos/aid-service.dto");
const booking_entity_1 = require("./booking.entity");
let AidServiceProfile = class AidServiceProfile {
};
exports.AidServiceProfile = AidServiceProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AidServiceProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: aid_service_enum_1.AidServiceProfileVerificationStatus.PENDING }),
    __metadata("design:type", String)
], AidServiceProfile.prototype, "verificationStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AidServiceProfile.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AidServiceProfile.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0.0 }),
    __metadata("design:type", Number)
], AidServiceProfile.prototype, "audioCallEarnings", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0.0 }),
    __metadata("design:type", Number)
], AidServiceProfile.prototype, "videoCallEarnings", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0.0 }),
    __metadata("design:type", Number)
], AidServiceProfile.prototype, "onSiteEarnings", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0.0 }),
    __metadata("design:type", Number)
], AidServiceProfile.prototype, "virtualServiceEarnings", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0.0 }),
    __metadata("design:type", Number)
], AidServiceProfile.prototype, "totalEarningsBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AidServiceProfile.prototype, "noOfAudioCallServices", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AidServiceProfile.prototype, "noOfVideoCallServices", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AidServiceProfile.prototype, "noOfOnSiteServices", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AidServiceProfile.prototype, "noOfVirtualServices", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], AidServiceProfile.prototype, "totalServicesRendered", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AidServiceProfile.prototype, "businessDocumentUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AidServiceProfile.prototype, "mediaFile", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AidServiceProfile.prototype, "contactPhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "json" }),
    __metadata("design:type", aid_service_dto_1.ISocialMediaLinksDTO)
], AidServiceProfile.prototype, "socialMediaLinks", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "json" }),
    __metadata("design:type", aid_service_dto_1.ILocationAddressDTO)
], AidServiceProfile.prototype, "locationAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AidServiceProfile.prototype, "verificationComment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0 }),
    __metadata("design:type", Number)
], AidServiceProfile.prototype, "averageRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0 }),
    __metadata("design:type", Number)
], AidServiceProfile.prototype, "noOfRatings", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Profile),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.Profile)
], AidServiceProfile.prototype, "verifiedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Profile, (user) => user.aidServiceProfiles),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.Profile)
], AidServiceProfile.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => aid_service_entity_1.AidService, (aidService) => aidService.aidServiceProfiles),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", aid_service_entity_1.AidService)
], AidServiceProfile.prototype, "aidService", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => call_entity_1.CallRoom, (callRoom) => callRoom.aidServiceProfile),
    __metadata("design:type", Array)
], AidServiceProfile.prototype, "calls", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (booking) => booking.aidServiceProfile),
    __metadata("design:type", Array)
], AidServiceProfile.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AidServiceProfile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AidServiceProfile.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], AidServiceProfile.prototype, "isDeleted", void 0);
exports.AidServiceProfile = AidServiceProfile = __decorate([
    (0, typeorm_1.Entity)()
], AidServiceProfile);
//# sourceMappingURL=aid-service-profile.entity.js.map