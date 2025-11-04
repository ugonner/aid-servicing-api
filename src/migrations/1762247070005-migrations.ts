import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1762247070005 implements MigrationInterface {
    name = 'Migrations1762247070005'

    public async up(queryRunner: QueryRunner): Promise<void> {
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

    public async down(queryRunner: QueryRunner): Promise<void> {
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
