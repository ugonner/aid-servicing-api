import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IApiResponse } from '../shared/helpers/apiresponse';
import { IConnectedUser } from '../shared/interfaces/user';
import { IInitUserConnectionDTO, IPlainRTCSocketMessageDTO, JoinRoomDTO } from '../shared/dtos/call.dto';
export declare class CallGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private server;
    getServer(): Server;
    private connectedUsers;
    constructor();
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
        peerId: string;
    }): Promise<IApiResponse<IConnectedUser | unknown>>;
    getConnectedUsers(client: Socket, payload: {
        peerId: string;
    }): Promise<IApiResponse<IConnectedUser | unknown>>;
    updateUserState(client: Socket, payload: IConnectedUser): Promise<IApiResponse<IConnectedUser | unknown>>;
    leave(client: Socket, payload: IConnectedUser): Promise<IApiResponse<IConnectedUser | unknown>>;
    getUser(socketIdOrPeerId: string): Promise<IConnectedUser>;
    insertUser(dto: Partial<IConnectedUser>): Promise<IConnectedUser>;
    updateUser(socketOrPeerId: string, dto: Partial<IConnectedUser>): Promise<IConnectedUser>;
    deleteUser(socketOrPeerId: string): Promise<void>;
}
