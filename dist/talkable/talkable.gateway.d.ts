import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IChat, IChatMessage, IChatUser } from '../shared/interfaces/talkables/chat';
import { IApiResponse } from '../shared/helpers/apiresponse';
export declare class TalkableGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    DBCChatUser: IChatUser;
    activeChats: IChat[];
    activeUsers: IChatUser[];
    afterInit(): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    joinRoom(client: Socket, payload: IChatUser): Promise<IApiResponse<IChat>>;
    joinRoomAsAdmin(client: Socket, payload: IChatUser): Promise<IApiResponse<IChat>>;
    joinInviteAcceptance(client: Socket, payload: IChat): Promise<IApiResponse<IChat>>;
    joinInviteRejection(client: Socket, payload: IChat): Promise<IApiResponse<IChat>>;
    sendChatMessage(client: Socket, payload: IChatMessage): Promise<IApiResponse<IChatMessage>>;
    addOrUpdateActiveChat(chat: IChat): Promise<void>;
    addOrUpdateActiveChatUser(chatUser: IChatUser): Promise<void>;
    getChat(chatId: string): Promise<IChat>;
    getUser(chatUser: Partial<IChatUser>): Promise<IChatUser>;
    getActiveChats(): Promise<IChat[]>;
}
