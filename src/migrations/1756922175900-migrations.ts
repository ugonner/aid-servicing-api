import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1756922175900 implements MigrationInterface {
    name = 'Migrations1756922175900'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\`
            ADD \`name\` varchar(255) NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` DROP COLUMN \`name\`
        `);
    }

}
