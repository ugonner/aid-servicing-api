import { Cluster } from './cluster.entity';
import { Profile } from './user.entity';
export declare class ProfileCluster {
    id?: number;
    cluster: Cluster;
    profile: Profile;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
