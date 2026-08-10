import { ProfileCluster } from "./user-cluster.entity";
import { AidServiceCluster } from "./aid-service-cluster.entity";
export declare class Cluster {
    id?: number;
    name: string;
    description: string;
    profileClusters: ProfileCluster[];
    aidServiceClusters: AidServiceCluster[];
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
