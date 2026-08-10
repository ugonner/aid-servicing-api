"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBUtils = void 0;
exports.handleDateQuery = handleDateQuery;
const common_1 = require("@nestjs/common");
class DBUtils {
    static async handleFailedQueryRunner(queryRunner, error) {
        await queryRunner.rollbackTransaction();
        (new common_1.Logger("HandleQueryRunnerTransactionFailure")).error(error?.message);
    }
    static async generateUniqueID(repository, uniqueProperty, length = 8, baseString = "") {
        baseString = baseString ? baseString : `${Math.random().toString(16).slice(2, length)}`;
        const entityExists = await repository.findOneBy({ [uniqueProperty]: baseString });
        if (!entityExists)
            return baseString;
        baseString = `${baseString}-${Math.random().toString(16).slice(2, (length))}`;
        return await DBUtils.generateUniqueID(repository, uniqueProperty, length, baseString);
    }
    static addTime(baseDate, duration, timeType = "Minutes") {
        let timeSpan;
        switch (timeType) {
            case "Days":
                timeSpan = (24 * 60 * 60 * 1000 * duration);
            case "Hours":
                timeSpan = (60 * 60 * 1000 * duration);
            case "Minutes":
                timeSpan = (60 * 1000 * duration);
            case "Seconds":
                timeSpan = (1000 * duration);
            case "Milliseconds":
                timeSpan = (duration);
            default:
                timeSpan = (60 * 1000 * duration);
                break;
        }
        return new Date(baseDate.getTime() + timeSpan);
    }
}
exports.DBUtils = DBUtils;
function handleDateQuery(dto, queryBuilder, dateField = "createdAt") {
    const { startDate, endDate, dDate, entityAlias } = dto;
    if (startDate && !endDate)
        queryBuilder.andWhere(`${entityAlias}.${dateField} >= :startDate`, { startDate });
    else if (endDate && !startDate)
        queryBuilder.andWhere(`${entityAlias}.${dateField} <= :endDate`, { endDate });
    else if (startDate && endDate)
        queryBuilder.andWhere(`DATE(${entityAlias}.${dateField}) BETWEEN :startDate AND :endDate`, { startDate, endDate });
    else if (dDate)
        queryBuilder.andWhere(`DATE(${entityAlias}.${dateField}) = :dDate`, { dDate });
    return queryBuilder;
}
//# sourceMappingURL=db.js.map