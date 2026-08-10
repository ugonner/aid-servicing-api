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
exports.TalkableGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const response_interceptor_1 = require("../shared/interceptors/response.interceptor");
const exception_filter_1 = require("../shared/interceptors/exception.filter");
const socket_io_1 = require("socket.io");
const chat_event_enum_1 = require("../shared/enums/talkables/chat-event.enum");
const apiresponse_1 = require("../shared/helpers/apiresponse");
let TalkableGateway = class TalkableGateway {
    constructor() {
        this.DBCChatUser = {
            userName: "DBC_OFFICIAL",
            userId: "dbc_official",
            phoneNumber: "08012345678"
        };
        this.activeChats = [];
        this.activeUsers = [];
    }
    async afterInit() {
        console.log("Talkable gateway is on");
    }
    async handleConnection(client) {
        console.log(client.id, " Connected");
    }
    handleDisconnect(client) {
        console.log(client.id, "Disconncted");
    }
    async joinRoom(client, payload) {
        let chatData;
        try {
            payload.socketId = client.id;
            const chatData = {
                chatId: `ID${payload.phoneNumber}TK`,
                users: [payload, this.DBCChatUser],
            };
            if (!payload.isAdmin) {
                client.join(chatData.chatId);
                await this.addOrUpdateActiveChat(chatData);
                await this.addOrUpdateActiveChatUser(payload);
                client.to(this.DBCChatUser.userId).emit(chat_event_enum_1.TalkableChatEvents.JOIN_ROOM_INVITE, chatData);
            }
            return apiresponse_1.ApiResponse.success("Join room successful", chatData);
        }
        catch (error) {
            console.log("Join room", error.message);
            return apiresponse_1.ApiResponse.fail("error joining room", chatData);
        }
    }
    async joinRoomAsAdmin(client, payload) {
        let chatData;
        try {
            payload.socketId = client.id;
            const chatData = {
                chatId: this.DBCChatUser.userId,
                users: [payload, this.DBCChatUser]
            };
            if (payload.isAdmin) {
                client.join(chatData.chatId);
                await this.addOrUpdateActiveChat(chatData);
                await this.addOrUpdateActiveChatUser(payload);
                this.activeChats.forEach((aChat) => {
                    client.join(aChat.chatId);
                    const chatMessageData = {
                        chatId: aChat.chatId,
                        sender: this.DBCChatUser,
                        receiver: aChat.users.find((user) => user.userId !== this.DBCChatUser.userId) || this.DBCChatUser,
                        message: `You have my attention`,
                        isViewed: false,
                        createdAt: new Date().toISOString()
                    };
                    client.to(aChat.chatId).emit(chat_event_enum_1.TalkableChatEvents.CHAT_MESSAGE, chatMessageData);
                });
            }
            return apiresponse_1.ApiResponse.success("Join room successful", chatData);
        }
        catch (error) {
            console.log("Join room", error.message);
            return apiresponse_1.ApiResponse.fail("error joining room as admin", chatData);
        }
    }
    async joinInviteAcceptance(client, payload) {
        let chat;
        try {
            await this.addOrUpdateActiveChat(payload);
            chat = await this.getChat(payload.chatId);
            const chatConversant = payload.users?.find((usr) => usr.userId !== this.DBCChatUser.userId);
            if (!chatConversant)
                return apiresponse_1.ApiResponse.fail("No conversant found", chat);
            const activeUser = await this.getUser(chatConversant);
            chat = payload;
            client.join(payload.chatId);
            this.server.to(client.id).emit(chat_event_enum_1.TalkableChatEvents.JOIN_INVITE_ACCEPTANCE, chat);
            client.to(activeUser?.socketId).emit(chat_event_enum_1.TalkableChatEvents.JOIN_INVITE_ACCEPTANCE, chat);
            return apiresponse_1.ApiResponse.success("Join invite accepted successfully", chat);
        }
        catch (error) {
            console.log("Error accepting join invite", error.message);
            return apiresponse_1.ApiResponse.fail("Error accepting join invite", chat);
        }
    }
    async joinInviteRejection(client, payload) {
        let chat;
        try {
            const chatConversant = payload.users?.find((usr) => usr.userId !== this.DBCChatUser.userId);
            if (!chatConversant)
                return apiresponse_1.ApiResponse.fail("No conversant found", chat);
            const activeUser = await this.getUser(chatConversant);
            chat = payload;
            client.to(activeUser?.socketId).emit(chat_event_enum_1.TalkableChatEvents.JOIN_INVITE_REJECTION, chat);
            return apiresponse_1.ApiResponse.success("Join invite rejected successfully", chat);
        }
        catch (error) {
            console.log("Error rejecting join invite", error.message);
            return apiresponse_1.ApiResponse.fail("Error rejecting join invite", chat);
        }
    }
    async sendChatMessage(client, payload) {
        let chatMessage;
        try {
            const chatConversant = payload.receiver;
            if (!chatConversant)
                return apiresponse_1.ApiResponse.fail("No conversant found", chatMessage);
            chatMessage = payload;
            this.server.to(payload.chatId).emit(chat_event_enum_1.TalkableChatEvents.CHAT_MESSAGE, chatMessage);
            return apiresponse_1.ApiResponse.success("Chat message sent successfully", chatMessage);
        }
        catch (error) {
            console.log("Error sending chat message", error.message);
            return apiresponse_1.ApiResponse.fail("Error sending caht message", chatMessage);
        }
    }
    async addOrUpdateActiveChat(chat) {
        try {
            const chatIndex = this.activeChats.findIndex((ac) => ac.chatId === chat.chatId);
            if (chatIndex === -1) {
                this.activeChats.push(chat);
                return;
            }
            const users = [...(this.activeChats[chatIndex].users || []), ...(chat.users || [])];
            this.activeChats[chatIndex] = { ...this.activeChats[chatIndex], ...chat, users };
        }
        catch (error) {
            console.log("Error updation active chats", error.message);
        }
    }
    async addOrUpdateActiveChatUser(chatUser) {
        try {
            const chatUserIndex = this.activeUsers.findIndex((usr) => (usr.userId && usr.userId === chatUser.userId) || (usr.socketId && usr.socketId === chatUser.socketId) || usr.userName === chatUser.userName);
            if (chatUserIndex === -1) {
                this.activeUsers.push(chatUser);
                return;
            }
            const chatIds = [...(this.activeUsers[chatUserIndex].chatIds || []), ...(chatUser.chatIds || [])];
            this.activeUsers[chatUserIndex] = { ...this.activeUsers[chatUserIndex], ...chatUser, chatIds };
        }
        catch (error) {
            console.log("Error updation active user", error.message);
        }
    }
    async getChat(chatId) {
        return this.activeChats.find((cht) => (cht.chatId === chatId));
    }
    async getUser(chatUser) {
        return this.activeUsers.find((usr) => (usr.userId && usr.userId === chatUser.userId) || (usr.socketId && usr.socketId === chatUser.socketId) || usr.userName === chatUser.userName);
    }
    async getActiveChats() {
        return this.activeChats;
    }
};
exports.TalkableGateway = TalkableGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TalkableGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_event_enum_1.TalkableChatEvents.JOIN_ROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], TalkableGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_event_enum_1.TalkableChatEvents.JOIN_AS_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], TalkableGateway.prototype, "joinRoomAsAdmin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_event_enum_1.TalkableChatEvents.JOIN_INVITE_ACCEPTANCE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], TalkableGateway.prototype, "joinInviteAcceptance", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_event_enum_1.TalkableChatEvents.JOIN_INVITE_REJECTION),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], TalkableGateway.prototype, "joinInviteRejection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_event_enum_1.TalkableChatEvents.CHAT_MESSAGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], TalkableGateway.prototype, "sendChatMessage", null);
exports.TalkableGateway = TalkableGateway = __decorate([
    (0, common_1.UseFilters)(exception_filter_1.EventExceptionHandler),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    (0, websockets_1.WebSocketGateway)({
        namespace: '/talkable',
        cors: {
            origin: '*',
        },
    })
], TalkableGateway);
//# sourceMappingURL=talkable.gateway.js.map