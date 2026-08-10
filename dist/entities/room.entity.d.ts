import { Profile } from "./user.entity";
export declare class AidServiceProvider {
    userId: string;
    aidServiceId: number;
}
export declare class Room {
    id: number;
    startTime: Date;
    endTime: Date;
    roomId: string;
    roomName: string;
    aidServiceProviders: AidServiceProvider[];
    invitees: Profile[];
    owner: Profile;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
