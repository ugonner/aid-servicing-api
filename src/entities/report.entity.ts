import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ServiceType } from "../shared/enums/review";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column({nullable: true})
    review: string;

    @Column()
    serviceType: ServiceType;

    @Column()
    serviceTypeEntityId: number;

    @Column()
    profileId: number;

    @Column({type: "bool", default: false})
    isResolved: boolean;

    @Column({nullable: true})
    resolvedById: number;

    @Column({nullable: true})
    comment?: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({default: false})
    isDeleted: boolean;
}