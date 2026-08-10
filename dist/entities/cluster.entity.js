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
exports.Cluster = void 0;
const typeorm_1 = require("typeorm");
const user_cluster_entity_1 = require("./user-cluster.entity");
const aid_service_cluster_entity_1 = require("./aid-service-cluster.entity");
let Cluster = class Cluster {
};
exports.Cluster = Cluster;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cluster.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cluster.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cluster.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_cluster_entity_1.ProfileCluster, (profileCluster) => profileCluster.cluster),
    __metadata("design:type", Array)
], Cluster.prototype, "profileClusters", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => aid_service_cluster_entity_1.AidServiceCluster, (aidServiceCluster) => aidServiceCluster.aidService),
    __metadata("design:type", Array)
], Cluster.prototype, "aidServiceClusters", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Cluster.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Cluster.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], Cluster.prototype, "isDeleted", void 0);
exports.Cluster = Cluster = __decorate([
    (0, typeorm_1.Entity)()
], Cluster);
//# sourceMappingURL=cluster.entity.js.map