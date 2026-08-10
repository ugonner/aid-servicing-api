import { Tag } from "./tag.entity";
import { AidService } from "./aid-service.entity";
export declare class AidServiceTag {
    id: number;
    tag: Tag;
    aidService: AidService;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
