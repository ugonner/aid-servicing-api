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
exports.AidServiceCluster = void 0;
const typeorm_1 = require("typeorm");
const cluster_entity_1 = require("./cluster.entity");
const aid_service_entity_1 = require("./aid-service.entity");
let AidServiceCluster = class AidServiceCluster {
};
exports.AidServiceCluster = AidServiceCluster;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AidServiceCluster.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cluster_entity_1.Cluster, (cluster) => cluster.aidServiceClusters),
    __metadata("design:type", cluster_entity_1.Cluster)
], AidServiceCluster.prototype, "cluster", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => aid_service_entity_1.AidService, (aidService) => aidService.aidServiceClusters),
    __metadata("design:type", aid_service_entity_1.AidService)
], AidServiceCluster.prototype, "aidService", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AidServiceCluster.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AidServiceCluster.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], AidServiceCluster.prototype, "isDeleted", void 0);
exports.AidServiceCluster = AidServiceCluster = __decorate([
    (0, typeorm_1.Entity)()
], AidServiceCluster);
//# sourceMappingURL=aid-service-cluster.entity.js.map