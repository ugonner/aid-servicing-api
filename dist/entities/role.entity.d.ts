export declare class Role {
    id: number;
    name: string;
    description: string;
    permissions: {
        [key: string]: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
