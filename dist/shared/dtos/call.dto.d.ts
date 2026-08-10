import { callPurpose, CallType, RoomType } from "../enums/call.enum";
import { PlainRTCSocketMessageType } from "../enums/socket.enum";
import { QueryRequestDTO } from "./query-request.dto";
export declare class IInitUserConnectionDTO {
    socketId?: string;
    peerId?: string;
    userId: string;
    userName?: string;
    avatar?: string;
}
export declare class JoinRoomDTO {
    socketId?: string;
    peerId?: string;
}
export interface IPlainRTCSocketMessageDTO<TMessageBody> {
    peerSocketId: string;
    messageType: PlainRTCSocketMessageType;
    message: TMessageBody;
    roomId?: string;
}
export declare class CallMemberDTO {
    userId: string;
    userName?: string;
}
export declare class CallRoomDTO {
    roomId: string;
    roomType: RoomType;
    startTime: number;
    endTime: number;
    callMembers: CallMemberDTO[];
    initiatedBy: string;
    answered?: boolean;
    callPurpose: callPurpose;
    callType: CallType;
    aidServiceProfileId: number;
}
export declare class QueryCallRoomDTO extends QueryRequestDTO {
    userId?: string;
    aidServiceProfileId?: string;
    aidServiceId?: string;
}
