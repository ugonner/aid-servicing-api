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
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const room_service_1 = require("./room.service");
const room_dto_1 = require("../shared/dtos/room.dto");
const apiresponse_1 = require("../shared/helpers/apiresponse");
const user_decorator_1 = require("../shared/guards/decorators/user.decorator");
const jwt_guards_1 = require("../shared/guards/jwt.guards");
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    async createRoom(payload, userId) {
        const room = await this.roomService.createRoom(userId, payload);
        if (!room)
            throw new common_1.InternalServerErrorException("Something went wrong creating room");
        return apiresponse_1.ApiResponse.success("Room created successfully", room);
    }
    async addInvitees(payload) {
        const res = await this.roomService.addParticipantsToRoom(payload.userPhonesOrEmailss, payload.roomId);
        if (!res)
            throw new common_1.InternalServerErrorException("Somethingwent wrong adding paricipants");
        return apiresponse_1.ApiResponse.success("Participants added successfully", res);
    }
    async getRooms(payload) {
        const res = await this.roomService.getRooms(payload);
        if (!res)
            throw new common_1.InternalServerErrorException("Somethingwent wrong adding paricipants");
        return apiresponse_1.ApiResponse.success("Participants added successfully", res);
    }
    async getRoom(roomId) {
        const res = await this.roomService.getRoom(roomId);
        if (!res)
            throw new common_1.InternalServerErrorException("Somethingwent wrong adding paricipants");
        return apiresponse_1.ApiResponse.success("Participants added successfully", res);
    }
};
exports.RoomController = RoomController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guards_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [room_dto_1.RoomDTO, String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Post)("/add-invitees"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [room_dto_1.UpdateRoomInviteesDTO]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "addInvitees", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [room_dto_1.QueryRoomDTO]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRooms", null);
__decorate([
    (0, common_1.Get)(":roomId"),
    __param(0, (0, common_1.Param)("roomId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoom", null);
exports.RoomController = RoomController = __decorate([
    (0, swagger_1.ApiTags)("room"),
    (0, common_1.Controller)("room"),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomController);
//# sourceMappingURL=room.controller.js.map