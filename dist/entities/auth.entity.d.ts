import { Role } from './role.entity';
import { AuthStatus, UserType } from '../shared/enums/auth.enum';
import { Profile } from './user.entity';
export declare class Auth {
    id: number;
    email: string;
    phoneNumber: string;
    password: string;
    userType: UserType;
    status: AuthStatus;
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
    formatEmail(): void;
    hashPassword(): Promise<void>;
    toAuthData(): {
        id: number;
        userId: string;
        email: string;
        status: AuthStatus;
        role: Role;
        isVerified: boolean;
    };
}
