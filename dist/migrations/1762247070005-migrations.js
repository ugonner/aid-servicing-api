"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1762247070005 = void 0;
class Migrations1762247070005 {
    constructor() {
        this.name = 'Migrations1762247070005';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "call_room" DROP COLUMN "startTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "call_room"
            ADD "startTime" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "call_room" DROP COLUMN "endTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "call_room"
            ADD "endTime" character varying NOT NULL
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "call_room" DROP COLUMN "endTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "call_room"
            ADD "endTime" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "call_room" DROP COLUMN "startTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "call_room"
            ADD "startTime" integer NOT NULL
        `);
    }
}
exports.Migrations1762247070005 = Migrations1762247070005;
//# sourceMappingURL=1762247070005-migrations.js.map