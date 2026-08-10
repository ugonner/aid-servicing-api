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
exports.ProfileCluster = void 0;
const typeorm_1 = require("typeorm");
const cluster_entity_1 = require("./cluster.entity");
const user_entity_1 = require("./user.entity");
let ProfileCluster = class ProfileCluster {
};
exports.ProfileCluster = ProfileCluster;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProfileCluster.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cluster_entity_1.Cluster, (cluster) => cluster.profileClusters),
    __metadata("design:type", cluster_entity_1.Cluster)
], ProfileCluster.prototype, "cluster", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Profile, (profile) => profile.profileClusters),
    __metadata("design:type", user_entity_1.Profile)
], ProfileCluster.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProfileCluster.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProfileCluster.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], ProfileCluster.prototype, "isDeleted", void 0);
exports.ProfileCluster = ProfileCluster = __decorate([
    (0, typeorm_1.Entity)()
], ProfileCluster);
//# sourceMappingURL=user-cluster.entity.js.map