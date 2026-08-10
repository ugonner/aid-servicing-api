export declare class RoomDTO {
    startTime: Date;
    duration?: number;
    roomName?: string;
}
export declare class QueryRoomDTO {
    startTime?: Date;
    duration?: number;
    roomName?: string;
    participant?: string;
    ownerId?: string;
    userId?: string;
    page: number;
    limit: number;
}
export declare class UpdateRoomInviteesDTO {
    roomId: string;
    userPhonesOrEmailss: string[];
}
