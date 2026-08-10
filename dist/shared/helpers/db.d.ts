import { QueryRunner, Repository, SelectQueryBuilder } from "typeorm";
export declare class DBUtils {
    static handleFailedQueryRunner(queryRunner: QueryRunner, error: Error): Promise<void>;
    static generateUniqueID<T>(repository: Repository<T>, uniqueProperty: string, length?: number, baseString?: string): Promise<string>;
    static addTime(baseDate: Date, duration: number, timeType?: "Days" | "Hours" | "Minutes" | "Seconds" | "Milliseconds"): Date;
}
export declare function handleDateQuery<TEntity>(dto: {
    startDate?: string;
    endDate?: string;
    dDate?: string;
    entityAlias: string;
}, queryBuilder: SelectQueryBuilder<TEntity>, dateField?: string): SelectQueryBuilder<TEntity>;
