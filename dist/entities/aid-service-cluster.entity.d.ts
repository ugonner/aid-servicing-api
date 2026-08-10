import { Cluster } from './cluster.entity';
import { AidService } from './aid-service.entity';
export declare class AidServiceCluster {
    id?: number;
    cluster: Cluster;
    aidService: AidService;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
