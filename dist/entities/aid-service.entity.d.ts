import { Profile } from './user.entity';
import { AidServiceProfile } from './aid-service-profile.entity';
import { AidServiceTag } from './aid-service-tag.entity';
import { Booking } from './booking.entity';
import { AidServiceCluster } from './aid-service-cluster.entity';
export declare class AidService {
    id: number;
    name: string;
    description?: string;
    avatar?: string;
    noOfAidServiceProfiles?: number;
    audioCallRate?: number;
    videoCallRate?: number;
    onSiteRate?: number;
    virtualServiceRate?: number;
    aidServiceProfiles: AidServiceProfile[];
    aidServiceTags: AidServiceTag[];
    bookings: Booking[];
    profile: Profile;
    aidServiceClusters: AidServiceCluster[];
    createdAt: Date;
    isDeleted: boolean;
}
