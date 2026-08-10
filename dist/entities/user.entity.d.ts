import { Auth } from './auth.entity';
import { DisabilityType, Gender } from '../shared/enums/user.enum';
import { CallRoom } from './call.entity';
import { AidServiceProfile } from './aid-service-profile.entity';
import { ProfileWallet } from './user-wallet.entity';
import { Booking } from './booking.entity';
import { ProfileCluster } from './user-cluster.entity';
export declare class Profile {
    id: number;
    userId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    gender?: Gender;
    phoneNumber?: string;
    disabilityType: DisabilityType;
    account: Auth;
    aidServiceProfiles: AidServiceProfile[];
    initiatedCalls: CallRoom[];
    calls: CallRoom[];
    wallet: ProfileWallet;
    profileClusters: ProfileCluster[];
    bookings: Booking[];
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
