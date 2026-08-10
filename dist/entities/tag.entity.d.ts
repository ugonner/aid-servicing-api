import { AidServiceTag } from "./aid-service-tag.entity";
export declare class Tag {
    id: number;
    name: string;
    aidServiceTags: AidServiceTag[];
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
