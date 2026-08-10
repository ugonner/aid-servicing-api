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
exports.CallGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const exception_filter_1 = require("../shared/interceptors/exception.filter");
const response_interceptor_1 = require("../shared/interceptors/response.interceptor");
const events_enum_1 = require("../shared/enums/events.enum");
const apiresponse_1 = require("../shared/helpers/apiresponse");
const call_dto_1 = require("../shared/dtos/call.dto");
const user_enum_1 = require("../shared/enums/user.enum");
const user_service_1 = require("../user/user.service");
const socket_enum_1 = require("../shared/enums/socket.enum");
let CallGateway = class CallGateway {
    getServer() {
        return this.server;
    }
    constructor(userService) {
        this.userService = userService;
    }
    async afterInit() {
        try {
            this.connectedUsers = [];
            console.log('Gateway started');
        }
        catch (error) {
            console.log('Error in AfterInit', error.message);
        }
    }
    async handleConnection(client, ...args) {
        console.log('connected', client.id);
    }
    async handleDisconnect(client) {
        this.deleteUser(client.id);
        const usersRecord = await this.getConnectedUsersRecord();
        const res = apiresponse_1.ApiResponse.success("users fetched successfully", usersRecord);
        this.server.emit(events_enum_1.BroadcastEvents.UPDATE_CONNECTED_USERS_RECORD, res);
    }
    async initConnectedUser(client, payload) {
        try {
            await this.insertUser(payload);
            const record = await this.getConnectedUsersRecord();
            const res = apiresponse_1.ApiResponse.success("users fetched successfully", record);
            this.server.emit(events_enum_1.BroadcastEvents.UPDATE_CONNECTED_USERS_RECORD, res);
            return payload;
        }
        catch (error) {
            console.log('Error init user', error.message);
            return payload;
        }
    }
    async joinRoom(client, payload) {
        try {
        }
        catch (error) { }
    }
    async getRoomProducers(client, payload) {
        try {
            const users = await this.connectedUsers.filter((usr) => usr.roomId === payload.roomId);
            return apiresponse_1.ApiResponse.success('Users fetched successsfully', users);
        }
        catch (error) {
            return apiresponse_1.ApiResponse.fail(error.message, error);
        }
    }
    async sendRTCMessage(client, payload) {
        try {
            if (payload.messageType === socket_enum_1.PlainRTCSocketMessageType.CALL_STATE)
                console.log('Msg received', payload);
            if (payload.roomId)
                client
                    .to(payload.roomId)
                    .emit(events_enum_1.BroadcastEvents.PLAIN_RTC_CALL_MESSAGE, payload);
            else
                client
                    .to(payload.peerSocketId)
                    .emit(events_enum_1.BroadcastEvents.PLAIN_RTC_CALL_MESSAGE, payload);
            return apiresponse_1.ApiResponse.success('message sent successsfully', payload);
        }
        catch (error) {
            return apiresponse_1.ApiResponse.fail(error.message, error);
        }
    }
    async getConnectedUser(client, payload) {
        try {
            const user = await this.getUser(payload.socketId);
            return apiresponse_1.ApiResponse.success('User fetched successsfully', user);
        }
        catch (error) {
            return apiresponse_1.ApiResponse.fail(error.message, error);
        }
    }
    async getConnectedUsers(client, payload) {
        try {
            const users = this.connectedUsers;
            return apiresponse_1.ApiResponse.success('Users fetched successsfully', users);
        }
        catch (error) {
            return apiresponse_1.ApiResponse.fail(error.message, error);
        }
    }
    async updateUserState(client, payload) {
        try {
            const user = await this.updateUser(client.id, payload);
            if (payload.roomId) {
                if (client.rooms.has(payload.roomId) &&
                    (payload.callState === user_enum_1.UserCallState.NONE ||
                        payload.callState === user_enum_1.UserCallState.DROPPED)) {
                    client.leave(payload.roomId);
                }
                else if (!client.rooms.has(payload.roomId) &&
                    payload.callState !== user_enum_1.UserCallState.NONE &&
                    payload.callState !== user_enum_1.UserCallState.DROPPED) {
                    client.join(payload.roomId);
                }
            }
            return apiresponse_1.ApiResponse.success('Users fetched successsfully', user);
        }
        catch (error) {
            return apiresponse_1.ApiResponse.fail(error.message, error);
        }
    }
    async leave(client, payload) {
        try {
            const user = await this.updateUser(client.id, {
                roomId: undefined,
                roomType: undefined,
            });
            return apiresponse_1.ApiResponse.success('Users fetched successsfully', user);
        }
        catch (error) {
            return apiresponse_1.ApiResponse.fail(error.message, error);
        }
    }
    async getAidServiceUsers(client, payload) {
        try {
            const users = this.connectedUsers.filter((usr) => usr.aidServiceProfiles.find((aidProfile) => aidProfile.aidService?.id === Number(payload.aidServiceId)));
            return apiresponse_1.ApiResponse.success("Aid service providers fetched successfully", users);
        }
        catch (error) {
            console.log("Error getting aid service providers", error.message);
            return apiresponse_1.ApiResponse.fail("Error getting service providers", error);
        }
    }
    async getUser(socketIdOrPeerId) {
        return this.connectedUsers.find((user) => user.socketId === socketIdOrPeerId);
    }
    async insertUser(dto) {
        let user = this.connectedUsers.find((user) => user.socketId === dto.socketId);
        if (user)
            return await this.updateUser(user.socketId, dto);
        const userProfile = await this.userService.getUser(dto.userId);
        user = { ...dto, aidServiceProfiles: userProfile?.aidServiceProfiles.map((aidProfile) => ({
                id: aidProfile.id,
                name: aidProfile.name,
                aidService: { id: aidProfile.aidService?.id, name: aidProfile.aidService?.name },
                verificationStatus: aidProfile.verificationStatus,
                isDeleted: aidProfile.isDeleted
            })) };
        this.connectedUsers.push(user);
        return user;
    }
    async updateUser(socketOrPeerId, dto) {
        const userIndex = this.connectedUsers.findIndex((user) => user.socketId === socketOrPeerId);
        if (userIndex === -1)
            throw new common_1.NotFoundException('User not found');
        const user = { ...(this.connectedUsers[userIndex] || {}), ...dto };
        this.connectedUsers[userIndex] = user;
        return user;
    }
    async deleteUser(socketOrPeerId) {
        this.connectedUsers = this.connectedUsers.filter((user) => user.socketId !== socketOrPeerId);
    }
    async getConnectedUsersRecord() {
        return {
            totalUsers: this.connectedUsers.length,
            totalAidServiceProfiles: (this.connectedUsers?.filter((usr) => usr.aidServiceProfiles?.length > 0))?.length
        };
    }
};
exports.CallGateway = CallGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CallGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_enum_1.BroadcastEvents.INIT_CONNECTED_USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, call_dto_1.IInitUserConnectionDTO]),
    __metadata("design:returntype", Promise)
], CallGateway.prototype, "initConnectedUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_enum_1.BroadcastEvents.JOIN_ROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, call_dto_1.JoinRoomDTO]),
    __metadata("design:returntype", Promise)
], CallGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_enum_1.BroadcastEvents.GET_ROOM_USERS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], CallGateway.prototype, "getRoomProducers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_enum_1.BroadcastEvents.PLAIN_RTC_CALL_MESSAGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], CallGateway.prototype, "sendRTCMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_enum_1.BroadcastEvents.GET_CONNECTED_USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], CallGateway.prototype, "getConnectedUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_enum_1.BroadcastEvents.GET_CONNECTED_USERS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], CallGateway.prototype, "getConnectedUsers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_enum_1.BroadcastEvents.UPDATE_USER_CALL_STATUS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], CallGateway.prototype, "updateUserState", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_enum_1.BroadcastEvents.LEAVE_ROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], CallGateway.prototype, "leave", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_enum_1.BroadcastEvents.GET_AVALABLE_AID_SERVICE_PROVIDERS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], CallGateway.prototype, "getAidServiceUsers", null);
exports.CallGateway = CallGateway = __decorate([
    (0, common_1.UseFilters)(exception_filter_1.EventExceptionHandler),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    (0, websockets_1.WebSocketGateway)({
        namespace: '/call',
        cors: {
            origin: '*',
        },
    }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], CallGateway);
//# sourceMappingURL=call.gateway.js.map