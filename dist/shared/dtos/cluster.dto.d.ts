import { AddOrRemoveAction } from "../../user/enums/cluster.enum";
export declare class ManageClustersOptionsDTO {
    action: AddOrRemoveAction;
    override?: boolean;
}
export declare class ManageClustersDTO {
    clusterIds: number[];
    options: ManageClustersOptionsDTO;
}
