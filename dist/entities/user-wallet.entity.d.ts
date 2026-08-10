import { Profile } from './user.entity';
export declare class ProfileWallet {
    id: number;
    fundedBalance: number;
    earnedBalance: number;
    pendingBalance: number;
    profile: Profile;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
