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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const room_entity_1 = require("../entities/room.entity");
const db_1 = require("../shared/helpers/db");
const user_entity_1 = require("../entities/user.entity");
const call_gateway_1 = require("./call.gateway");
const auth_entity_1 = require("../entities/auth.entity");
let RoomService = class RoomService {
    constructor(dataSource, roomRepository, authRepository, callGateway) {
        this.dataSource = dataSource;
        this.roomRepository = roomRepository;
        this.authRepository = authRepository;
        this.callGateway = callGateway;
    }
    async createRoom(userId, dto) {
        let newRoom;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            console.log("userId", userId);
            const user = await queryRunner.manager.findOneBy(user_entity_1.Profile, { userId });
            if (!user)
                throw new common_1.NotFoundException('User Account not found');
            if (!/ugonna/i.test(user.firstName))
                throw new common_1.UnauthorizedException("Only Ugonna can create events for now");
            const roomId = await db_1.DBUtils.generateUniqueID(this.roomRepository, 'roomId', 8, dto.roomName);
            const startTime = new Date(dto.startTime);
            const endTime = db_1.DBUtils.addTime(startTime, dto.duration || 20, 'Minutes');
            const room = queryRunner.manager.create(room_entity_1.Room, {
                startTime,
                endTime,
                roomId,
                roomName: dto.roomName ? dto.roomName : 'Conference',
                owner: user,
            });
            await queryRunner.manager.save(room_entity_1.Room, room);
            await queryRunner.commitTransaction();
            newRoom = room;
        }
        catch (error) {
            await db_1.DBUtils.handleFailedQueryRunner(queryRunner, error);
            throw error;
        }
        finally {
            await queryRunner.release();
            return newRoom;
        }
    }
    async addParticipants(participantIds, room, queryRunner) {
        let addedParticipants;
        queryRunner = queryRunner
            ? queryRunner
            : this.dataSource.createQueryRunner();
        const inviteesByEmail = await queryRunner.manager.find(user_entity_1.Profile, {
            where: { account: { email: (0, typeorm_2.In)(participantIds) } },
        });
        const inviteesByPone = await queryRunner.manager.findBy(user_entity_1.Profile, {
            phoneNumber: (0, typeorm_2.In)(participantIds),
        });
        const allParticipants = [
            ...new Set([...inviteesByEmail, ...inviteesByPone]),
        ];
        room.invitees =
            room.invitees.length > 0
                ? [...new Set([...room.invitees, ...allParticipants])]
                : allParticipants;
        await queryRunner.manager.save(room_entity_1.Room, room);
        return allParticipants;
    }
    async addParticipantsToRoom(participantIds, roomId) {
        let addedParticipants;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const room = await queryRunner.manager.findOne(room_entity_1.Room, {
                where: { roomId },
                relations: ['invitees'],
            });
            if (!room)
                throw new common_1.NotFoundException('Room not found');
            addedParticipants = await this.addParticipants(participantIds, room, queryRunner);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await db_1.DBUtils.handleFailedQueryRunner(queryRunner, error);
        }
        finally {
            await queryRunner.release();
            return addedParticipants;
        }
    }
    async removeParticipants(participantIds, room, queryRunner) {
        let addedParticipants;
        queryRunner = queryRunner
            ? queryRunner
            : this.dataSource.createQueryRunner();
        const filteredParticipants = [];
        participantIds.forEach((participant) => {
            for (let i = 0; i < room.invitees.length; i++) {
                if (room.invitees[i].account.email === participant ||
                    room.invitees[i].phoneNumber === participant) {
                    room.invitees.splice(i, 1);
                    break;
                }
            }
        });
        room.invitees = filteredParticipants;
        await queryRunner.manager.save(room_entity_1.Room, room);
        return filteredParticipants;
    }
    async getRoom(roomId) {
        return await this.roomRepository.findOne({
            where: { roomId },
            relations: ['owner', 'invitees'],
        });
    }
    async getRooms(dto) {
        const { userId } = dto;
        const page = dto.page ? Number(dto.page) : 1;
        const limit = dto.limit ? Number(dto.limit) : 50;
        let whereClause;
        let rooms;
        if (userId) {
            whereClause = { invitees: { userId } };
        }
        rooms = await this.roomRepository.find({
            where: whereClause,
            relations: ['invitees'],
            order: { id: 'DESC' },
            skip: page - 1,
            take: limit,
        });
        return rooms;
    }
    async getUserByUniqueId(uniqueId) {
        return await this.authRepository.createQueryBuilder("auth")
            .leftJoinAndSelect("auth.profile", "profile")
            .orWhere(`"auth"."email" = :uniqueId`, { uniqueId })
            .orWhere(`"auth"."userId" = :uniqueId`, { uniqueId })
            .orWhere(`"profile"."phoneNumber" = :uniqueId`, { uniqueId })
            .getOne();
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __param(2, (0, typeorm_1.InjectRepository)(auth_entity_1.Auth)),
    __param(3, (0, common_1.Inject)("CALL_GATEWWAY")),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        call_gateway_1.CallGateway])
], RoomService);
//# sourceMappingURL=room.service.js.map