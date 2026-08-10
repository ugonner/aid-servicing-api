import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import { Auth } from '../entities/auth.entity';
import { UserProfileDTO } from '../shared/dtos/user.dto';
import { AuthDTO, OtpAuthDTO, QueryAuthDTO } from '../shared/dtos/auth.dto';
import { Profile } from '../entities/user.entity';
import { IQueryResult } from '../shared/interfaces/api-response.interface';
import { MailService } from '../mail/mail.service';
import { Role } from '../entities/role.entity';
import { RoleDTO } from '../shared/dtos/role.dto';
export declare class AuthService {
    private authRepository;
    private jwtService;
    private dataSource;
    private mailService;
    constructor(authRepository: Repository<Auth>, jwtService: JwtService, dataSource: DataSource, mailService: MailService);
    private logger;
    generateOTP(): number;
    createAccount(dto: UserProfileDTO): Promise<Auth>;
    private validateDto;
    login(dto: AuthDTO, values: {
        userAgent: string;
        ipAddress: string;
    }): Promise<{
        token: string;
        refreshToken: string;
        id: number;
        email: string;
        phoneNumber: string;
        password: string;
        userType: import("../shared/enums/auth.enum").UserType;
        status: import("../shared/enums/auth.enum").AuthStatus;
        userId: string;
        firstName: string;
        lastName: string;
        otp: number;
        otpTime: Date;
        isVerified: boolean;
        role: Role;
        profile: Profile;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
    }>;
    generateRefreshAndAccessToken(user: Partial<Auth>, refreshData: {
        userAgent: string;
        ipAddress: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    verifyAccount(dto: OtpAuthDTO, values: {
        userAgent: string;
        ipAddress: string;
    }): Promise<{
        token: string;
        refresh: string;
    }>;
    resendOtp(payload: OtpAuthDTO): Promise<OtpAuthDTO>;
    requestResetPassword(payload: OtpAuthDTO): Promise<OtpAuthDTO>;
    resetPassword(payload: OtpAuthDTO): Promise<string>;
    getAuthUsers(dto: QueryAuthDTO): Promise<IQueryResult<Auth>>;
    getIP(): Promise<string>;
    createRole(dto: RoleDTO): Promise<Role>;
    updateRole(roleId: number, dto: RoleDTO): Promise<Role>;
    getRoles(): Promise<Role[]>;
    assignRole(userId: string, roleId: number): Promise<Auth>;
}
