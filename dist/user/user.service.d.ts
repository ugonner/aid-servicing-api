import { DataSource, SelectQueryBuilder } from 'typeorm';
import { Profile } from '../entities/user.entity';
import { QueryUserDTO, UpdateProfileDTO } from '../shared/dtos/user.dto';
import { ClusterDTO, ManageUserClustersDTO } from './dtos/cluster.dto';
import { Cluster } from '../entities/cluster.entity';
import { IQueryResult } from '../shared/interfaces/api-response.interface';
export declare class UserService {
    private dataSource;
    constructor(dataSource: DataSource);
    updateUser(userId: string, dto: UpdateProfileDTO): Promise<Profile>;
    getUser(userId: string): Promise<Profile>;
    createCluster(dto: ClusterDTO): Promise<Cluster>;
    updateCluster(clusterId: number, dto: ClusterDTO): Promise<Cluster>;
    getClusters(): Promise<Cluster[]>;
    manageUserClusters(userId: string, dto: ManageUserClustersDTO, config: {
        action: 'Add' | 'Remove';
        override: boolean;
    }): Promise<Profile>;
    getQueryBuilder(): SelectQueryBuilder<Profile>;
    getUsers(dto: QueryUserDTO, userid?: string): Promise<IQueryResult<Profile>>;
}
