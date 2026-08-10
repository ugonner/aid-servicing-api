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
exports.Profile = void 0;
const typeorm_1 = require("typeorm");
const auth_entity_1 = require("./auth.entity");
const user_enum_1 = require("../shared/enums/user.enum");
const call_entity_1 = require("./call.entity");
const aid_service_profile_entity_1 = require("./aid-service-profile.entity");
const user_wallet_entity_1 = require("./user-wallet.entity");
const booking_entity_1 = require("./booking.entity");
const user_cluster_entity_1 = require("./user-cluster.entity");
let Profile = class Profile {
};
exports.Profile = Profile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "disabilityType", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => auth_entity_1.Auth, (auth) => auth.profile),
    __metadata("design:type", auth_entity_1.Auth)
], Profile.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => aid_service_profile_entity_1.AidServiceProfile, (aidServiceProfile) => aidServiceProfile.profile),
    __metadata("design:type", Array)
], Profile.prototype, "aidServiceProfiles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => call_entity_1.CallRoom, (callRoom) => callRoom.initiatedBy),
    __metadata("design:type", Array)
], Profile.prototype, "initiatedCalls", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => call_entity_1.CallRoom, (callRoom) => callRoom.callMembers),
    __metadata("design:type", Array)
], Profile.prototype, "calls", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_wallet_entity_1.ProfileWallet, (profileWallet) => profileWallet.profile, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_wallet_entity_1.ProfileWallet)
], Profile.prototype, "wallet", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_cluster_entity_1.ProfileCluster, (profileCluster) => profileCluster.profile),
    __metadata("design:type", Array)
], Profile.prototype, "profileClusters", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (booking) => booking.profile),
    __metadata("design:type", Array)
], Profile.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Profile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Profile.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], Profile.prototype, "isDeleted", void 0);
exports.Profile = Profile = __decorate([
    (0, typeorm_1.Entity)()
], Profile);
//# sourceMappingURL=user.entity.js.map