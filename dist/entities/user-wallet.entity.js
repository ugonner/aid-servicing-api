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
exports.ProfileWallet = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let ProfileWallet = class ProfileWallet {
};
exports.ProfileWallet = ProfileWallet;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProfileWallet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0.00 }),
    __metadata("design:type", Number)
], ProfileWallet.prototype, "fundedBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0.00 }),
    __metadata("design:type", Number)
], ProfileWallet.prototype, "earnedBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0.00 }),
    __metadata("design:type", Number)
], ProfileWallet.prototype, "pendingBalance", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.Profile, (profile) => profile.wallet),
    __metadata("design:type", user_entity_1.Profile)
], ProfileWallet.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProfileWallet.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProfileWallet.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], ProfileWallet.prototype, "isDeleted", void 0);
exports.ProfileWallet = ProfileWallet = __decorate([
    (0, typeorm_1.Entity)()
], ProfileWallet);
//# sourceMappingURL=user-wallet.entity.js.map