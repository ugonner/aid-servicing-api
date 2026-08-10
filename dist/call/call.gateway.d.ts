import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IApiResponse } from '../shared/helpers/apiresponse';
import { IConnectedSocketUsersRecord, IConnectedUser } from '../shared/interfaces/user';
import { IInitUserConnectionDTO, IPlainRTCSocketMessageDTO, JoinRoomDTO } from '../shared/dtos/call.dto';
import { UserService } from '../user/user.service';
export declare class CallGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private userService;
    private server;
    getServer(): Server;
    private connectedUsers;
    constructor(userService: UserService);
    afterInit(): Promise<void>;
    handleConnection(client: Socket, ...args: any[]): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    initConnectedUser(client: Socket, payload: IInitUserConnectionDTO): Promise<IInitUserConnectionDTO>;
    joinRoom(client: Socket, payload: JoinRoomDTO): Promise<void>;
    getRoomProducers(client: Socket, payload: {
        roomId: string;
    }): Promise<IApiResponse<IConnectedUser[] | unknown>>;
    sendRTCMessage(client: Socket, payload: IPlainRTCSocketMessageDTO<unknown>): Promise<IApiResponse<IPlainRTCSocketMessageDTO<unknown> | unknown>>;
    getConnectedUser(client: Socket, payload: {
        socketId: string;
    }): Promise<IApiResponse<IConnectedUser | unknown>>;
    getConnectedUsers(client: Socket, payload: {
        roomId: string;
    }): Promise<IApiResponse<IConnectedUser | unknown>>;
    updateUserState(client: Socket, payload: IConnectedUser): Promise<IApiResponse<IConnectedUser | unknown>>;
    leave(client: Socket, payload: IConnectedUser): Promise<IApiResponse<IConnectedUser | unknown>>;
    getAidServiceUsers(client: Socket, payload: {
        aidServiceId: number;
    }): Promise<IApiResponse<IConnectedUser[]>>;
    getUser(socketIdOrPeerId: string): Promise<IConnectedUser>;
    insertUser(dto: Partial<IConnectedUser>): Promise<IConnectedUser>;
    updateUser(socketOrPeerId: string, dto: Partial<IConnectedUser>): Promise<IConnectedUser>;
    deleteUser(socketOrPeerId: string): Promise<void>;
    getConnectedUsersRecord(): Promise<IConnectedSocketUsersRecord>;
}
