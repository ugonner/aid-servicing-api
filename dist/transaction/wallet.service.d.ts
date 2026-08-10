import { DataSource } from "typeorm";
import { ProfileWallet } from "../entities/user-wallet.entity";
export declare class WalletService {
    private dataSource;
    constructor(dataSource: DataSource);
    getUserWallet(userId: string): Promise<ProfileWallet>;
}
