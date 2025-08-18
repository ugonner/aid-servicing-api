import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1754939734658 implements MigrationInterface {
    name = 'Migrations1754939734658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`booking\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`compositeBookingId\` varchar(255) NOT NULL,
                \`bookingStatus\` varchar(255) NOT NULL DEFAULT 'Pending',
                \`paymentStatus\` varchar(255) NOT NULL DEFAULT 'Not paid',
                \`totalAmount\` int NOT NULL DEFAULT '0',
                \`bookingNote\` varchar(255) NULL,
                \`locationAddress\` json NOT NULL,
                \`startDate\` varchar(255) NOT NULL,
                \`endDate\` varchar(255) NOT NULL,
                \`duration\` int NOT NULL DEFAULT '0',
                \`isMatched\` tinyint NOT NULL DEFAULT 0,
                \`confirmedByProvider\` tinyint NOT NULL DEFAULT 0,
                \`confirmedByUser\` tinyint NOT NULL DEFAULT 0,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`aidServiceId\` int NULL,
                \`aidServiceProfileId\` int NULL,
                \`profileId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
