import { AuthService } from './auth.service';
import { UserProfileDTO } from '../shared/dtos/user.dto';
import { ApiResponse } from '../shared/helpers/apiresponse';
import { AuthDTO, OtpAuthDTO, QueryAuthDTO } from '../shared/dtos/auth.dto';
import { RoleDTO } from '../shared/dtos/role.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerAdminAccount(payload: UserProfileDTO, req: any): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/auth.entity").Auth>>;
    login(payload: AuthDTO, req: any, ip: string): Promise<ApiResponse>;
    verifyAccount(payload: OtpAuthDTO, req: any, ip: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<{
        token: string;
        refresh: string;
    }>>;
    forgotPassword(payload: OtpAuthDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<OtpAuthDTO>>;
    requestResetPassword(payload: OtpAuthDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<OtpAuthDTO>>;
    resetPassword(payload: OtpAuthDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<string>>;
    resendOtp(payload: OtpAuthDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<OtpAuthDTO>>;
    requestOtp(payload: OtpAuthDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<OtpAuthDTO>>;
    createRole(payload: RoleDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/role.entity").Role>>;
    updateRole(payload: RoleDTO, roleId: number): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/role.entity").Role>>;
    assignUserRole(userId: string, roleId: number): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/auth.entity").Auth>>;
    getHostIp(): Promise<import("../shared/helpers/apiresponse").IApiResponse<{
        ipAddress: string;
    }>>;
    getAuthUsers(payload: QueryAuthDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../shared/interfaces/api-response.interface").IQueryResult<import("../entities/auth.entity").Auth>>>;
    getRoles(): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/role.entity").Role[]>>;
}
