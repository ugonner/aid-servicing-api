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
exports.CallRoom = void 0;
const typeorm_1 = require("typeorm");
const call_enum_1 = require("../shared/enums/call.enum");
const user_entity_1 = require("./user.entity");
const aid_service_profile_entity_1 = require("./aid-service-profile.entity");
let CallRoom = class CallRoom {
};
exports.CallRoom = CallRoom;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CallRoom.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CallRoom.prototype, "roomId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CallRoom.prototype, "roomType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", Number)
], CallRoom.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", Number)
], CallRoom.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], CallRoom.prototype, "answered", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CallRoom.prototype, "callPurpose", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CallRoom.prototype, "callType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0 }),
    __metadata("design:type", Number)
], CallRoom.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CallRoom.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => aid_service_profile_entity_1.AidServiceProfile, (aidServiceProfile) => aidServiceProfile.calls),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", aid_service_profile_entity_1.AidServiceProfile)
], CallRoom.prototype, "aidServiceProfile", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.Profile, (profile) => profile.calls),
    (0, typeorm_1.JoinTable)({
        name: "CallMembersProfile"
    }),
    __metadata("design:type", Array)
], CallRoom.prototype, "callMembers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Profile, (profile) => profile.initiatedCalls),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.Profile)
], CallRoom.prototype, "initiatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CallRoom.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CallRoom.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], CallRoom.prototype, "isDeleted", void 0);
exports.CallRoom = CallRoom = __decorate([
    (0, typeorm_1.Entity)()
], CallRoom);
//# sourceMappingURL=call.entity.js.map