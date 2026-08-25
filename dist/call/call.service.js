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
exports.CallService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const notification_service_1 = require("../notifiction/notification.service");
const call_entity_1 = require("../entities/call.entity");
const call_enum_1 = require("../shared/enums/call.enum");
const aid_service_profile_entity_1 = require("../entities/aid-service-profile.entity");
const user_wallet_entity_1 = require("../entities/user-wallet.entity");
let CallService = class CallService {
    constructor(dataSource, notificationService) {
        this.dataSource = dataSource;
        this.notificationService = notificationService;
    }
    async createAidServiceCall(dto) {
        let newCallRoom;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            if (dto.callPurpose !== call_enum_1.callPurpose.AID_SERVICE)
                throw new common_1.BadRequestException("This is not an aid-service call");
            const aidServiceProfile = await queryRunner.manager.findOne(aid_service_profile_entity_1.AidServiceProfile, {
                where: { id: dto.aidServiceProfileId },
                relations: ["aidService", "profile"]
            });
            if (!aidServiceProfile)
                throw new common_1.NotFoundException("Aid service profile not found");
            const { aidService, profile } = aidServiceProfile;
            const callDuration = dto.startTime ? Math.trunc(((Number(dto.endTime) - Number(dto.startTime)) / 1000)) : 0;
            const aidServiciecostRate = dto.callType === call_enum_1.CallType.AUDIO ? Number(aidService.audioCallRate) : Number(aidService.videoCallRate);
            const callCost = callDuration * Number(aidServiciecostRate);
            if (dto.callType === call_enum_1.CallType.AUDIO) {
                aidServiceProfile.audioCallEarnings = Number(aidServiceProfile.audioCallEarnings) + callCost;
                aidServiceProfile.noOfAudioCallServices = Number(aidServiceProfile.noOfAudioCallServices) + 1;
            }
            else {
                aidServiceProfile.videoCallEarnings = Number(aidServiceProfile.videoCallEarnings) + callCost;
                aidServiceProfile.noOfVideoCallServices = Number(aidServiceProfile.noOfVideoCallServices) + 1;
            }
            aidServiceProfile.totalEarningsBalance = Number(aidServiceProfile.totalEarningsBalance) + callCost;
            aidServiceProfile.totalServicesRendered = Number(aidServiceProfile.totalServicesRendered) + 1;
            await queryRunner.manager.save(aid_service_profile_entity_1.AidServiceProfile, aidServiceProfile);
            const { callMembers, initiatedBy, aidServiceProfileId, ...restCallRoomDto } = dto;
            const callMembersProfiles = await queryRunner.manager.find(user_entity_1.Profile, {
                where: { userId: (0, typeorm_2.In)(callMembers.map((usr) => usr.userId)) }
            });
            const initiatedByProfile = await queryRunner.manager.findOne(user_entity_1.Profile, {
                where: { userId: initiatedBy },
            });
            const initiatorWallet = await queryRunner.manager.findOne(user_wallet_entity_1.ProfileWallet, { where: { profile: { userId: initiatedByProfile.userId } } });
            initiatorWallet.fundedBalance = Number(initiatorWallet.fundedBalance) - callCost;
            const aidserviceProfileWallet = await queryRunner.manager.findOneBy(user_wallet_entity_1.ProfileWallet, {
                profile: { userId: aidServiceProfile.profile?.userId }
            });
            aidserviceProfileWallet.earnedBalance = Number(aidserviceProfileWallet.earnedBalance) + callCost;
            await queryRunner.manager.save(user_wallet_entity_1.ProfileWallet, [initiatorWallet, aidserviceProfileWallet]);
            const callRoomData = { ...restCallRoomDto, callMembers: callMembersProfiles, aidServiceProfile, initiatedBy: initiatedByProfile };
            const callRoom = queryRunner.manager.create(call_entity_1.CallRoom, callRoomData);
            const savedCallRoom = await queryRunner.manager.save(call_entity_1.CallRoom, callRoom);
            await queryRunner.commitTransaction();
            newCallRoom = savedCallRoom;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return newCallRoom;
        }
    }
    async createPlainCall(dto) {
        let newCallRoom;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            if (dto.callPurpose !== call_enum_1.callPurpose.NORMAL)
                throw new common_1.BadRequestException("This is not a non-service call");
            const { callMembers, initiatedBy, aidServiceProfileId, ...restCallRoomDto } = dto;
            const callMembersProfiles = await queryRunner.manager.find(user_entity_1.Profile, {
                where: { userId: (0, typeorm_2.In)(callMembers.map((usr) => usr.userId)) }
            });
            const initiatedByProfile = await queryRunner.manager.findOne(user_entity_1.Profile, {
                where: { userId: initiatedBy },
            });
            const callRoomData = { ...restCallRoomDto, callMembers: callMembersProfiles, initiatedBy: initiatedByProfile };
            const callRoom = queryRunner.manager.create(call_entity_1.CallRoom, callRoomData);
            const savedCallRoom = await queryRunner.manager.save(call_entity_1.CallRoom, callRoom);
            await queryRunner.commitTransaction();
            newCallRoom = savedCallRoom;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return newCallRoom;
        }
    }
    getQueryBuilder() {
        const repository = this.dataSource.manager.getRepository(call_entity_1.CallRoom);
        return repository.createQueryBuilder('callRoom')
            .leftJoinAndSelect("callRoom.initiatedBy", "initiatedBy")
            .leftJoinAndSelect("callRoom.aidServiceProfile", "aidServiceProfile")
            .leftJoinAndSelect("aidServiceProfile.aidService", "aidService")
            .leftJoinAndSelect("callRoom.callMembers", "callMembers");
    }
    async getCallRooms(dto, userid) {
        const { userId, aidServiceProfileId, aidServiceId, searchTerm, order, page, limit, ...queryFields } = dto;
        const queryPage = page ? Number(page) : 1;
        const queryLimit = limit ? Number(limit) : 10;
        const queryOrder = order ? order.toUpperCase() : 'DESC';
        const queryOrderBy = 'createdAt';
        const queryBuilder = this.getQueryBuilder();
        if (queryFields) {
            Object.keys(queryFields).forEach((field) => {
                queryBuilder.andWhere(`callRoom.${field} = :value`, {
                    value: queryFields[field],
                });
            });
        }
        console.log("GETTING CALLS");
        if (userId) {
            queryBuilder.andWhere(`callMembers.userId = :userId OR initiatedBy.userId = :userId`, { userId });
        }
        if (aidServiceProfileId) {
            queryBuilder.andWhere(`aidServiceProfile.id = :aidServiceProfileId`, { aidServiceProfileId });
        }
        if (aidServiceId) {
            queryBuilder.andWhere(`aidService.id = :aidServiceId`, { aidServiceId });
        }
        if (searchTerm) {
            const searchFields = ['address'];
            let queryStr = `LOWER(CallMembersProfiles.firstName) LIKE :searchTerm OR LOWER(users.lastName) LIKE :searchTerm OR LOWER(users.email) LIKE :searchTerm OR LOWER(users.phoneNumber) LIKE :searchTerm`;
            searchFields.forEach((field) => {
                queryStr += ` OR LOWER(CallMembersProfiles.${field}) LIKE :searchTerm`;
            });
            queryBuilder.andWhere(queryStr, {
                searchTerm: `%${searchTerm.toLowerCase().trim()}%`,
            });
        }
        queryBuilder
            .orderBy(`callRoom.${queryOrderBy}`, queryOrder)
            .skip((queryPage - 1) * queryLimit)
            .limit(queryLimit);
        const [data, total] = await queryBuilder.getManyAndCount();
        return { page: queryPage, limit: queryLimit, total, data };
    }
    async getUserCalls(userId) {
        return await this.dataSource.getRepository(call_entity_1.CallRoom).find({
            where: { callMembers: { userId } },
            relations: ["aidServiceProfile", "aidServiceProfile.aidService"]
        });
    }
    async getCallRoom(callRoomId) {
        return await this.dataSource.createQueryRunner().manager.findOneBy(call_entity_1.CallRoom, { id: callRoomId });
    }
};
exports.CallService = CallService;
exports.CallService = CallService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        notification_service_1.NotificationService])
], CallService);
//# sourceMappingURL=call.service.js.map