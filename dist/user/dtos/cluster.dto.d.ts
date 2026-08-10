import { AddOrRemoveAction } from "../enums/cluster.enum";
export declare class ClusterDTO {
    name: string;
    description?: string;
}
export declare class ManageUserClusterOptionDTO {
    action: AddOrRemoveAction;
    override: boolean;
}
export declare class ManageUserClustersDTO {
    clusterIds: number[];
    options: ManageUserClusterOptionDTO;
}
