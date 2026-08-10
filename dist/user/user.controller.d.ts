import { UserService } from './user.service';
import { Profile } from '../entities/user.entity';
import { Auth } from '../entities/auth.entity';
import { QueryUserDTO, UpdateProfileDTO } from '../shared/dtos/user.dto';
import { ClusterDTO, ManageUserClustersDTO } from './dtos/cluster.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateUser(payload: UpdateProfileDTO, user: Auth, queryPayload: {
        userId: string;
    }): Promise<import("../shared/helpers/apiresponse").IApiResponse<Profile>>;
    createCluster(payload: ClusterDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/cluster.entity").Cluster>>;
    updateCluster(payload: ClusterDTO, clusterId: number): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/cluster.entity").Cluster>>;
    manageUserCluster(payload: ManageUserClustersDTO, userId: string, paramUserId: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<Profile>>;
    getClusters(): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/cluster.entity").Cluster[]>>;
    getUsers(payload: QueryUserDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../shared/interfaces/api-response.interface").IQueryResult<Profile>>>;
    getUser(userId: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<Profile>>;
}
