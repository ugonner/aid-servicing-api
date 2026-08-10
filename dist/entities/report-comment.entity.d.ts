import { Profile } from "./user.entity";
import { Report } from "./report.entity";
export declare class ReportComment {
    id: number;
    comment: string;
    profile: Profile;
    report: Report;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
