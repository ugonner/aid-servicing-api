import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1754505274074 implements MigrationInterface {
    name = 'Migrations1754505274074'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE \`aid_service\`
            ADD \`noOfAidServiceProfiles\` int NULL DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE \`aid_service\` DROP COLUMN \`noOfAidServiceProfiles\`
        `);
            }

}
