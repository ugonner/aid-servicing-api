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
exports.AidServiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const aid_service_enum_1 = require("../shared/enums/aid-service.enum");
const aid_service_entity_1 = require("../entities/aid-service.entity");
const user_entity_1 = require("../entities/user.entity");
const aid_service_profile_entity_1 = require("../entities/aid-service-profile.entity");
const file_upload_service_1 = require("../file-upload/file-upload.service");
const tag_entity_1 = require("../entities/tag.entity");
const aid_service_tag_entity_1 = require("../entities/aid-service-tag.entity");
const db_1 = require("../shared/helpers/db");
const aid_service_profile_select_1 = require("./datasets/aid-service-profile-select");
const aid_service_selection_1 = require("./datasets/aid-service-selection");
const notification_service_1 = require("../notifiction/notification.service");
const notification_enum_1 = require("../notifiction/enums/notification.enum");
const aid_service_cluster_entity_1 = require("../entities/aid-service-cluster.entity");
const cluster_entity_1 = require("../entities/cluster.entity");
const cluster_enum_1 = require("../user/enums/cluster.enum");
let AidServiceService = class AidServiceService {
    constructor(dataSource, fileUploadService, notificationService) {
        this.dataSource = dataSource;
        this.fileUploadService = fileUploadService;
        this.notificationService = notificationService;
    }
    async setAidServiceTags(queryRunner, aidService, tags) {
        const existingTags = await queryRunner.manager.findBy(tag_entity_1.Tag, {
            name: (0, typeorm_2.In)(tags.map((tag) => tag.name.toLowerCase())),
        });
        let newDTOTags = [];
        let existingDTOTags = [];
        tags.forEach((tag) => {
            const existingTag = existingTags.find((eTag) => eTag.name === tag.name.toLowerCase());
            if (existingTag) {
                existingDTOTags.push(existingTag);
            }
            else {
                const tagInstance = queryRunner.manager.create(tag_entity_1.Tag, {
                    ...tag,
                    name: tag.name.toLowerCase(),
                });
                newDTOTags.push(tagInstance);
            }
        });
        const newTags = await queryRunner.manager.save(tag_entity_1.Tag, newDTOTags);
        if (aidService.aidServiceTags?.length) {
            await queryRunner.manager.remove(aid_service_tag_entity_1.AidServiceTag, aidService.aidServiceTags);
        }
        const aidServiceTags = await queryRunner.manager.save(aid_service_tag_entity_1.AidServiceTag, [...existingDTOTags, ...newTags].map((tag) => ({
            aidService,
            tag,
        })));
        return aidServiceTags;
    }
    async saveAidServiceClusters(aidService, clusterIds, action, queryRunner) {
        let savedAidServiceClusters = aidService.aidServiceClusters;
        if (action === cluster_enum_1.AddOrRemoveAction.ADD) {
            if (aidService.aidServiceClusters?.length)
                await queryRunner.manager.remove(aid_service_cluster_entity_1.AidServiceCluster, aidService.aidServiceClusters);
            const clusters = await queryRunner.manager.findBy(cluster_entity_1.Cluster, {
                id: (0, typeorm_2.In)(clusterIds),
            });
            const aidServiceClusters = queryRunner.manager.create(aid_service_cluster_entity_1.AidServiceCluster, clusters.map((cluster) => ({
                aidService,
                cluster,
            })));
            savedAidServiceClusters = await queryRunner.manager.save(aid_service_cluster_entity_1.AidServiceCluster, aidServiceClusters);
        }
        else if (action === cluster_enum_1.AddOrRemoveAction.REMOVE) {
            const targetsERVICEClusters = aidService.aidServiceClusters.filter((aCluster) => Boolean(clusterIds.find((clusterId) => clusterId == aCluster.id)));
            if (targetsERVICEClusters?.length)
                await queryRunner.manager.remove(aid_service_cluster_entity_1.AidServiceCluster, targetsERVICEClusters);
        }
        return savedAidServiceClusters;
    }
    async createAidService(userId, dto) {
        let newAidServiceData;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const { tags, clusterIds, ...aidServiceDto } = dto;
            const adminProfile = await queryRunner.manager.findOneBy(user_entity_1.Profile, {
                userId,
            });
            const name = aidServiceDto.name.toLowerCase();
            const serviceExists = await queryRunner.manager.findOneBy(aid_service_entity_1.AidService, {
                name,
            });
            if (serviceExists)
                throw new common_1.BadRequestException('Aid Service alreay exists');
            const aidServiceInit = queryRunner.manager.create(aid_service_entity_1.AidService, {
                ...(aidServiceDto || {}),
                name,
                profile: adminProfile,
            });
            const aidService = await queryRunner.manager.save(aid_service_entity_1.AidService, aidServiceInit);
            if (tags?.length) {
                const aidServiceTags = await this.setAidServiceTags(queryRunner, aidService, tags);
            }
            if (clusterIds?.length) {
                await this.saveAidServiceClusters(aidService, clusterIds, cluster_enum_1.AddOrRemoveAction.ADD, queryRunner);
            }
            await queryRunner.commitTransaction();
            newAidServiceData = aidService;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return newAidServiceData;
        }
    }
    async updateAidService(aidServiceId, dto) {
        let newAidServiceData;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const name = dto.name.toLowerCase();
            const { tags, clusterIds, ...aidServiceDto } = dto;
            let aidService = await queryRunner.manager.findOne(aid_service_entity_1.AidService, {
                where: { id: aidServiceId },
                relations: ["aidServiceClusters", "aidServiceTags"]
            });
            if (!aidService)
                throw new common_1.NotFoundException('Service not found');
            const aidServiceExists = await queryRunner.manager.findOne(aid_service_entity_1.AidService, {
                where: { id: (0, typeorm_2.Not)(aidServiceId), name },
            });
            if (aidServiceExists)
                throw new common_1.BadRequestException('Another Service with same name already exists');
            const aidServiceData = { ...aidService, ...aidServiceDto, name };
            aidService = await queryRunner.manager.save(aid_service_entity_1.AidService, aidServiceData);
            if (tags?.length) {
                const aidServiceTags = await this.setAidServiceTags(queryRunner, aidService, tags);
            }
            if (clusterIds?.length) {
                await this.saveAidServiceClusters(aidService, clusterIds, cluster_enum_1.AddOrRemoveAction.ADD, queryRunner);
            }
            await queryRunner.commitTransaction();
            newAidServiceData = aidService;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return newAidServiceData;
        }
    }
    async updateAidServiceClusters(aidServiceId, dto) {
        let updatedAidServiceClusters;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const aidService = await queryRunner.manager.findOne(aid_service_entity_1.AidService, {
                where: { id: aidServiceId },
                relations: ["aidServiceClusters"]
            });
            if (!aidService)
                throw new common_1.NotFoundException("aid service not found");
            const saved = await this.saveAidServiceClusters(aidService, dto.clusterIds, dto.options.action, queryRunner);
            await queryRunner.commitTransaction();
            updatedAidServiceClusters = saved;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return updatedAidServiceClusters;
        }
    }
    getQueryBuilder() {
        const repository = this.dataSource.manager.getRepository(aid_service_entity_1.AidService);
        return repository
            .createQueryBuilder('aidService')
            .select(aid_service_selection_1.AidServiceSelectFields)
            .leftJoinAndSelect('aidService.aidServiceTags', 'aidServiceTags')
            .leftJoinAndSelect('aidServiceTags.tag', 'tags')
            .leftJoinAndSelect("aidService.aidServiceClusters", "aidServiceClusters")
            .leftJoinAndSelect("aidServiceClusters.cluster", "clusters");
    }
    async getAidServices(dto) {
        const { tags, clusterIds, searchTerm, startDate, endDate, dDate, order, page, limit, ...queryFields } = dto;
        const queryPage = page ? Number(page) : 1;
        const queryLimit = limit ? Number(limit) : 10;
        const queryOrder = order ? order.toUpperCase() : 'DESC';
        const queryOrderBy = 'createdAt';
        let queryBuilder = this.getQueryBuilder();
        queryBuilder.where('aidService.isDeleted != :isDeleted', {
            isDeleted: true,
        });
        if (queryFields) {
            Object.keys(queryFields).forEach((field) => {
                queryBuilder.andWhere(`aidService.${field} = :value`, {
                    value: queryFields[field],
                });
            });
        }
        if (startDate || endDate || dDate) {
            queryBuilder = (0, db_1.handleDateQuery)({ startDate, endDate, dDate, entityAlias: 'aidService' }, queryBuilder, 'createdAt');
        }
        if (tags) {
            const tagArr = tags.split(',');
            queryBuilder.andWhere('tags.id IN (:...tagArr)', { tagArr });
        }
        if (clusterIds) {
            const clusterArr = clusterIds.split(',');
            queryBuilder.andWhere('clusters.id IN (:...clusterArr)', { clusterArr });
        }
        if (searchTerm) {
            const searchFields = ['name', 'description'];
            let queryStr = `LOWER(aidService.name) LIKE :searchTerm`;
            searchFields.forEach((field) => {
                queryStr += ` OR LOWER(aidService.${field}) LIKE :searchTerm`;
            });
            ['name'].forEach((field) => {
                queryStr += ` OR LOWER(tags.${field}) LIKE :searchTerm`;
            });
            queryBuilder.andWhere(queryStr, {
                searchTerm: `%${searchTerm.toLowerCase().trim()}%`,
            });
        }
        const [data, total] = await queryBuilder
            .orderBy(`aidService.${queryOrderBy}`, queryOrder)
            .skip((queryPage - 1) * queryLimit)
            .limit(queryLimit)
            .getManyAndCount();
        return { page: queryPage, limit: queryLimit, total, data };
    }
    async createOrUpdateAidServiceProfile(userId, dto) {
        let updatedAidServiceProfile;
        let errorData;
        const staledFiles = [];
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const { aidServiceId, ...applicationDto } = dto;
            let aidServiceProfile = await queryRunner.manager.findOne(aid_service_profile_entity_1.AidServiceProfile, {
                where: { aidService: { id: aidServiceId }, profile: { userId } },
            });
            let isNewProfile = false;
            if (aidServiceProfile) {
                if (applicationDto.businessDocumentUrl.trim() &&
                    applicationDto.businessDocumentUrl?.trim() !==
                        aidServiceProfile.businessDocumentUrl?.trim()) {
                    staledFiles.push(aidServiceProfile.businessDocumentUrl);
                }
                if (applicationDto.mediaFile?.trim() &&
                    applicationDto.mediaFile?.trim() !==
                        aidServiceProfile.mediaFile?.trim()) {
                    staledFiles.push(aidServiceProfile.mediaFile);
                }
                aidServiceProfile = { ...aidServiceProfile, ...applicationDto };
            }
            else {
                const profile = await queryRunner.manager.findOneBy(user_entity_1.Profile, {
                    userId,
                });
                const aidService = await queryRunner.manager.findOneBy(aid_service_entity_1.AidService, {
                    id: aidServiceId,
                });
                if (!profile)
                    throw new common_1.NotFoundException('User not found');
                if (!aidService)
                    throw new common_1.NotFoundException('Aidservice does not exist');
                aidServiceProfile = queryRunner.manager.create(aid_service_profile_entity_1.AidServiceProfile, {
                    ...applicationDto,
                    profile,
                    aidService,
                });
                isNewProfile = true;
            }
            const savedAidServiceProfile = await queryRunner.manager.save(aid_service_profile_entity_1.AidServiceProfile, aidServiceProfile);
            if (isNewProfile && savedAidServiceProfile.aidService) {
                savedAidServiceProfile.aidService.noOfAidServiceProfiles =
                    Number(savedAidServiceProfile.aidService.noOfAidServiceProfiles) + 1;
                await queryRunner.manager.save(aid_service_entity_1.AidService, savedAidServiceProfile.aidService);
            }
            await queryRunner.commitTransaction();
            updatedAidServiceProfile = savedAidServiceProfile;
            const notDto = {
                creator: savedAidServiceProfile.profile,
                receivers: [
                    savedAidServiceProfile.aidService?.profile,
                    savedAidServiceProfile?.profile,
                ],
                context: notification_enum_1.NotificationContext.SERVICE_PROFILE,
                contextEntityId: savedAidServiceProfile?.id,
                notificationEventType: isNewProfile
                    ? notification_enum_1.NotificationEventType.AID_SERVICE_PROFILE_APPLICATION
                    : notification_enum_1.NotificationEventType.AID_SERVICE_PROFILE_APPLICATION_UPDATE,
                title: isNewProfile
                    ? notification_enum_1.NotificationEventType.AID_SERVICE_PROFILE_APPLICATION
                    : notification_enum_1.NotificationEventType.AID_SERVICE_PROFILE_APPLICATION_UPDATE,
                description: isNewProfile
                    ? `A New Application has been received`
                    : `Profile Application detail updated`,
                data: {
                    link: `${process.env.APP_URL}/aid-service/profile?aspi=${savedAidServiceProfile?.id}`,
                },
            };
            this.notificationService.sendNotification(notDto, {
                sendEmail: true,
                notifyAdmin: true,
            });
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (staledFiles.length > 0) {
                staledFiles.forEach((fileUrl) => this.fileUploadService.deletEeFileCloudinary(fileUrl));
            }
            if (errorData)
                throw errorData;
            return updatedAidServiceProfile;
        }
    }
    async updateUserAidServiceVerificationStatus(aidServiceProfileId, dto, userId) {
        let updatedAidServiceProfile;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            let aidServiceProfile = await queryRunner.manager.findOne(aid_service_profile_entity_1.AidServiceProfile, {
                where: { id: aidServiceProfileId },
                relations: ['profile'],
            });
            if (!aidServiceProfile)
                throw new common_1.BadRequestException('Aid service profile not found');
            const verifiedBy = await queryRunner.manager.findOneBy(user_entity_1.Profile, {
                userId,
            });
            aidServiceProfile.verificationStatus = dto.verificationStatus;
            aidServiceProfile.verificationComment = dto.verificationComment;
            aidServiceProfile.verifiedBy = verifiedBy;
            const savedAidServiceProfile = await queryRunner.manager.save(aid_service_profile_entity_1.AidServiceProfile, aidServiceProfile);
            await queryRunner.commitTransaction();
            updatedAidServiceProfile = savedAidServiceProfile;
            const notDto = {
                creator: aidServiceProfile?.profile,
                receivers: [aidServiceProfile.profile],
                context: notification_enum_1.NotificationContext.SERVICE_PROFILE,
                contextEntityId: aidServiceProfile.id,
                notificationEventType: dto.verificationStatus ===
                    aid_service_enum_1.AidServiceProfileVerificationStatus.VERIFIED
                    ? notification_enum_1.NotificationEventType.AID_SERVICE_PROFILE_APPLICATION_APPROVED
                    : notification_enum_1.NotificationEventType.AID_SERVICE_PROFILE_VERIFICATION_UPDATE,
                title: dto.verificationStatus ===
                    aid_service_enum_1.AidServiceProfileVerificationStatus.VERIFIED
                    ? notification_enum_1.NotificationEventType.AID_SERVICE_PROFILE_APPLICATION_APPROVED
                    : notification_enum_1.NotificationEventType.AID_SERVICE_PROFILE_VERIFICATION_UPDATE,
                description: `The verification status of this profile has been updated to: ${dto.verificationStatus}`,
                data: {
                    link: `${process.env.APP_URL}/aid-service/profile?aspi=${savedAidServiceProfile?.id}`,
                    receiverName: aidServiceProfile.profile?.firstName,
                    verification: dto.verificationStatus,
                    comment: dto.verificationComment,
                },
            };
            this.notificationService.sendNotification(notDto, {
                sendEmail: true,
                notifyAdmin: false,
            });
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return updatedAidServiceProfile;
        }
    }
    async updateUserAidService(userId, aidServiceId, action) {
        let updatedAidServiceProfile;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            let aidServiceProfile = await queryRunner.manager.findOne(aid_service_profile_entity_1.AidServiceProfile, {
                where: { aidService: { id: aidServiceId }, profile: { userId } },
            });
            if (action === 'add') {
                if (aidServiceProfile) {
                    if (!aidServiceProfile.isDeleted)
                        throw new common_1.BadRequestException('Aid service has not been removed earlier');
                    aidServiceProfile.isDeleted = false;
                }
                else {
                    const profile = await queryRunner.manager.findOneBy(user_entity_1.Profile, {
                        userId,
                    });
                    const aidService = await queryRunner.manager.findOneBy(aid_service_entity_1.AidService, {
                        id: aidServiceId,
                    });
                    if (!profile)
                        throw new common_1.NotFoundException('User not found');
                    if (!aidService)
                        throw new common_1.NotFoundException('Aidservice does not exist');
                    aidServiceProfile = queryRunner.manager.create(aid_service_profile_entity_1.AidServiceProfile, {
                        profile,
                        aidService,
                    });
                }
            }
            if (action === 'remove') {
                if (!aidServiceProfile)
                    throw new common_1.BadRequestException('Aid service NOT already added');
                aidServiceProfile.isDeleted = true;
            }
            const savedAidServiceProfile = await queryRunner.manager.save(aid_service_profile_entity_1.AidServiceProfile, aidServiceProfile);
            await queryRunner.commitTransaction();
            updatedAidServiceProfile = savedAidServiceProfile;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return updatedAidServiceProfile;
        }
    }
    async getAidServiceProfiles(dto) {
        const { clusterIds, verificationStatus, aidServiceId, aidServiceProfileId, userId, searchTerm } = dto;
        const queryOrder = dto.order ? dto.order : 'ASC';
        const queryPage = dto.page ? Number(dto.page) : 1;
        const queryLimit = dto.limit ? Number(dto.limit) : 10;
        const queryBuilder = this.dataSource
            .getRepository(aid_service_profile_entity_1.AidServiceProfile)
            .createQueryBuilder('aidServiceProfile')
            .select(aid_service_profile_select_1.AidServiceProfileSelectFields)
            .leftJoinAndSelect('aidServiceProfile.profile', 'profile')
            .leftJoin('aidServiceProfile.aidService', 'aidService')
            .leftJoinAndSelect("aidService.aidServiceClusters", "aidServiceClusters")
            .leftJoinAndSelect("aidServiceClusters.cluster", "clusters")
            .where('aidServiceProfile.isDeleted = false');
        if (aidServiceId) {
            queryBuilder.andWhere('aidService.id = :aidServiceId', { aidServiceId });
        }
        if (clusterIds) {
            const clusterArr = clusterIds.split(',');
            queryBuilder.andWhere('clusters.id IN (:...clusterArr)', { clusterArr });
        }
        if (userId) {
            queryBuilder.andWhere('profile.userId = :userId', { userId });
        }
        if (aidServiceId) {
            queryBuilder.andWhere('aidService.id = :aidServiceId', { aidServiceId });
        }
        if (aidServiceProfileId) {
            queryBuilder.andWhere(`aidServiceProfile.id = :aidServiceProfileId`, { aidServiceProfileId });
        }
        if (verificationStatus) {
            queryBuilder.andWhere('aidServiceProfile.verificationStatus = :verificationStatus', { verificationStatus });
        }
        if (searchTerm) {
            let queryStr = `LOWER(aidServiceProfile.name) LIKE :searchTerm`;
            let searchFields = ['email', 'firstName', 'lastName', 'disabilityType'];
            searchFields.forEach((field) => {
                queryStr += ` OR LOWER(profile.${field}) LIKE :searchTerm`;
            });
            queryBuilder.andWhere(queryStr, {
                searchTerm: `%${searchTerm.toLowerCase().trim()}%`,
            });
        }
        const [data, total] = await queryBuilder
            .orderBy('aidServiceProfile.createdAt', queryOrder)
            .skip((queryPage - 1) * queryLimit)
            .limit(queryLimit)
            .getManyAndCount();
        return { limit: queryLimit, page: queryPage, total, data };
    }
    async getAidService(aidServiceId) {
        return await this.dataSource.getRepository(aid_service_entity_1.AidService).findOne({
            where: { id: aidServiceId },
        });
    }
    async getAidServiceProfile(aidServiceProfileId) {
        return await this.dataSource.getRepository(aid_service_profile_entity_1.AidServiceProfile).findOne({
            where: { id: aidServiceProfileId },
            relations: ['profile', 'aidService'],
        });
    }
    async getTags() {
        return await this.dataSource.getRepository(tag_entity_1.Tag).find();
    }
};
exports.AidServiceService = AidServiceService;
exports.AidServiceService = AidServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        file_upload_service_1.FileUploadService,
        notification_service_1.NotificationService])
], AidServiceService);
//# sourceMappingURL=aid-service.service.js.map