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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const auth_entity_1 = require("../entities/auth.entity");
const cluster_entity_1 = require("../entities/cluster.entity");
const user_cluster_entity_1 = require("../entities/user-cluster.entity");
let UserService = class UserService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async updateUser(userId, dto) {
        let newUser;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const { firstName, lastName } = dto;
            const authUser = await queryRunner.manager.findOne(auth_entity_1.Auth, {
                where: { userId },
                relations: ['profile'],
            });
            if (!authUser)
                throw new common_1.NotFoundException('No user found');
            const profile = authUser.profile;
            if (firstName || lastName) {
                const authData = { firstName, lastName };
                await queryRunner.manager.save(auth_entity_1.Auth, { ...authUser, ...authData });
            }
            const userData = { ...profile, ...dto };
            const user = await queryRunner.manager.save(user_entity_1.Profile, userData);
            await queryRunner.commitTransaction();
            newUser = user;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return newUser;
        }
    }
    async getUser(userId) {
        const user = await this.dataSource.getRepository(user_entity_1.Profile).findOne({
            where: { userId },
            relations: ["profileClusters", "profileClusters.cluster", 'aidServiceProfiles', 'aidServiceProfiles.aidService'],
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async createCluster(dto) {
        let newCluster;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const name = dto.name.toLowerCase();
            const existingCluster = await queryRunner.manager.findOneBy(cluster_entity_1.Cluster, { name });
            if (existingCluster)
                throw new common_1.BadRequestException("cluster already exists");
            const clusterData = { ...dto, name };
            const cluster = queryRunner.manager.create(cluster_entity_1.Cluster, clusterData);
            const savedCluster = await queryRunner.manager.save(cluster_entity_1.Cluster, cluster);
            await queryRunner.commitTransaction();
            newCluster = savedCluster;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return newCluster;
        }
    }
    async updateCluster(clusterId, dto) {
        let updatedCluster;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const name = dto.name.toLowerCase();
            const existingCluster = await queryRunner.manager.findOneBy(cluster_entity_1.Cluster, { name, id: (0, typeorm_2.Not)(clusterId) });
            if (existingCluster)
                throw new common_1.BadRequestException("cluster already exists");
            const cluster = await queryRunner.manager.findOneBy(cluster_entity_1.Cluster, { id: clusterId });
            if (!cluster)
                throw new common_1.NotFoundException("CLUSTER NOT FOUND");
            const clusterData = { ...cluster, ...dto, name };
            const clusterInstance = queryRunner.manager.create(cluster_entity_1.Cluster, clusterData);
            const savedCluster = await queryRunner.manager.save(cluster_entity_1.Cluster, clusterInstance);
            await queryRunner.commitTransaction();
            updatedCluster = savedCluster;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return updatedCluster;
        }
    }
    async getClusters() {
        return this.dataSource.getRepository(cluster_entity_1.Cluster).findBy({});
    }
    async manageUserClusters(userId, dto, config) {
        let updatedUser;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const profile = await queryRunner.manager.findOne(user_entity_1.Profile, {
                where: { userId },
                relations: ['profileClusters', 'profileClusters.cluster'],
            });
            if (!profile)
                throw new common_1.NotFoundException('No profile found');
            const clusters = await queryRunner.manager.findBy(cluster_entity_1.Cluster, {
                id: (0, typeorm_2.In)(dto.clusterIds),
            });
            if (config.action === 'Add') {
                let targetProfileClusters;
                if (config.override) {
                    targetProfileClusters = queryRunner.manager.create(user_cluster_entity_1.ProfileCluster, clusters.map((cl) => ({ profile, cluster: cl })));
                    await queryRunner.manager.remove(user_cluster_entity_1.ProfileCluster, [
                        ...(profile.profileClusters || []),
                    ]);
                }
                else {
                    const newUserClusters = clusters.filter((clstr) => !Boolean(profile.profileClusters?.find((pClstr) => pClstr.cluster?.id === clstr.id)));
                    targetProfileClusters = queryRunner.manager.create(user_cluster_entity_1.ProfileCluster, newUserClusters.map((clstr) => ({
                        profile,
                        cluster: clstr,
                    })));
                }
                await queryRunner.manager.save(user_cluster_entity_1.ProfileCluster, targetProfileClusters);
            }
            else if (config.action === 'Remove') {
                if (!profile.profileClusters || profile.profileClusters.length === 0)
                    throw new common_1.NotFoundException('User has no cluster ');
                const targetProfileClusters = profile.profileClusters.filter((pCltr) => Boolean(dto.clusterIds.find((cId) => cId === pCltr.cluster.id)));
                await queryRunner.manager.save(user_cluster_entity_1.ProfileCluster, targetProfileClusters);
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return updatedUser;
        }
    }
    getQueryBuilder() {
        const repository = this.dataSource.manager.getRepository(user_entity_1.Profile);
        return repository.createQueryBuilder('profile')
            .leftJoinAndSelect("profile.profileClusters", "profileClusters")
            .leftJoinAndSelect(`profileClusters.cluster`, "clusters")
            .where("profile.isDeleted = false");
    }
    async getUsers(dto, userid) {
        const { clusterIds, searchTerm, order, page, limit, ...queryFields } = dto;
        const queryPage = page ? Number(page) : 1;
        const queryLimit = limit ? Number(limit) : 10;
        const queryOrder = order ? order.toUpperCase() : 'DESC';
        const queryOrderBy = 'createdAt';
        const queryBuilder = this.getQueryBuilder();
        if (queryFields) {
            Object.keys(queryFields).forEach((field) => {
                queryBuilder.andWhere(`profile.${field} = :value`, {
                    value: queryFields[field],
                });
            });
        }
        if (searchTerm) {
            const searchFields = ['address'];
            let queryStr = `LOWER(Profile.firstName) LIKE :searchTerm OR LOWER(users.lastName) LIKE :searchTerm OR LOWER(users.email) LIKE :searchTerm OR LOWER(users.phoneNumber) LIKE :searchTerm`;
            searchFields.forEach((field) => {
                queryStr += ` OR LOWER(Profile.${field}) LIKE :searchTerm`;
            });
            queryBuilder.andWhere(queryStr, {
                searchTerm: `%${searchTerm.toLowerCase().trim()}%`,
            });
        }
        const [data, total] = await queryBuilder
            .orderBy(`profile.${queryOrderBy}`, queryOrder)
            .skip((queryPage - 1) * queryLimit)
            .limit(queryLimit)
            .getManyAndCount();
        return { page: queryPage, limit: queryLimit, total, data };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], UserService);
//# sourceMappingURL=user.service.js.map