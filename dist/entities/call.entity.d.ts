import { callPurpose, CallType, RoomType } from "../shared/enums/call.enum";
import { Profile } from "./user.entity";
import { AidServiceProfile } from "./aid-service-profile.entity";
export declare class CallRoom {
    id: number;
    roomId: string;
    roomType: RoomType;
    startTime: number;
    endTime: number;
    answered?: boolean;
    callPurpose: callPurpose;
    callType: CallType;
    rating: number;
    review: string;
    aidServiceProfile: AidServiceProfile;
    callMembers: Profile[];
    initiatedBy: Profile;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
