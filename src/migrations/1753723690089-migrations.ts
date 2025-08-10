import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1753723690089 implements MigrationInterface {
    name = 'Migrations1753723690089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`role\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`description\` varchar(255) NULL,
                \`permissions\` json NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`auth\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`email\` varchar(255) NULL,
                \`phoneNumber\` varchar(255) NULL,
                \`password\` varchar(255) NOT NULL,
                \`userType\` varchar(255) NOT NULL DEFAULT 'Guest',
                \`status\` varchar(255) NOT NULL DEFAULT 'Inactive',
                \`userId\` varchar(255) NOT NULL,
                \`firstName\` varchar(255) NULL,
                \`lastName\` varchar(255) NULL,
                \`otp\` int NULL,
                \`otpTime\` datetime NULL,
                \`isVerified\` tinyint NOT NULL DEFAULT 0,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`roleId\` int NULL,
                \`profileId\` int NULL,
                UNIQUE INDEX \`IDX_373ead146f110f04dad6084815\` (\`userId\`),
                UNIQUE INDEX \`REL_ca49e738c1e64b0c839cae30d4\` (\`profileId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`aid_service\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`description\` varchar(255) NULL,
                \`audioCallRate\` int NULL,
                \`videoCallRate\` int NULL,
                \`onSiteRate\` int NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`aid_service_profile\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`verificationStatus\` varchar(255) NOT NULL DEFAULT 'Pending',
                \`description\` varchar(255) NULL,
                \`audioCallEarnings\` int NOT NULL DEFAULT '0',
                \`videoCallEarnings\` int NOT NULL DEFAULT '0',
                \`onSiteEarnings\` int NOT NULL DEFAULT '0',
                \`totalEarningsBalance\` int NOT NULL DEFAULT '0',
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`profileId\` int NULL,
                \`aidServiceId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`call_room\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`roomId\` varchar(255) NOT NULL,
                \`roomType\` varchar(255) NOT NULL,
                \`startTime\` int NOT NULL,
                \`endTime\` int NOT NULL,
                \`answered\` tinyint NOT NULL DEFAULT 0,
                \`callPurpose\` varchar(255) NOT NULL,
                \`callType\` varchar(255) NOT NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`aidServiceProfileId\` int NULL,
                \`initiatedById\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`profile_wallet\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`balance\` float(2) NOT NULL DEFAULT '0',
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`profile\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`userId\` varchar(255) NOT NULL,
                \`email\` varchar(255) NULL,
                \`firstName\` varchar(255) NULL,
                \`lastName\` varchar(255) NULL,
                \`avatar\` varchar(255) NULL,
                \`gender\` varchar(255) NULL,
                \`phoneNumber\` varchar(255) NULL,
                \`disabilityType\` varchar(255) NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`walletId\` int NULL,
                UNIQUE INDEX \`REL_d307cd0f00be8c8efcc831102b\` (\`walletId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`room\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`startTime\` datetime NOT NULL,
                \`endTime\` datetime NOT NULL,
                \`roomId\` varchar(255) NOT NULL,
                \`roomName\` varchar(255) NOT NULL,
                \`aidServiceProviders\` json NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`ownerId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`CallMembersProfile\` (
                \`callRoomId\` int NOT NULL,
                \`profileId\` int NOT NULL,
                INDEX \`IDX_8c8a9e0c7f1de68e7c224bd812\` (\`callRoomId\`),
                INDEX \`IDX_2e6071a3f288260887df4e7083\` (\`profileId\`),
                PRIMARY KEY (\`callRoomId\`, \`profileId\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`RoomParticipant\` (
                \`roomId\` int NOT NULL,
                \`profileId\` int NOT NULL,
                INDEX \`IDX_6b382d96f800cb7c2b480586f5\` (\`roomId\`),
                INDEX \`IDX_cc54111ce7c27f56e4d83514f3\` (\`profileId\`),
                PRIMARY KEY (\`roomId\`, \`profileId\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\`
            ADD CONSTRAINT \`FK_b368cb67ee97687c9fdc9a04153\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\`
            ADD CONSTRAINT \`FK_ca49e738c1e64b0c839cae30d4e\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\`
            ADD CONSTRAINT \`FK_16657f3f9d33e6ab8b9b97b5971\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\`
            ADD CONSTRAINT \`FK_79fd8bfcb413d9445bb5d2662ad\` FOREIGN KEY (\`aidServiceId\`) REFERENCES \`aid_service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`call_room\`
            ADD CONSTRAINT \`FK_a2e7bdbfd1f3660a328eb7735be\` FOREIGN KEY (\`aidServiceProfileId\`) REFERENCES \`aid_service_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`call_room\`
            ADD CONSTRAINT \`FK_d65554b5e3c256591d360527635\` FOREIGN KEY (\`initiatedById\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\`
            ADD CONSTRAINT \`FK_d307cd0f00be8c8efcc831102b2\` FOREIGN KEY (\`walletId\`) REFERENCES \`profile_wallet\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room\`
            ADD CONSTRAINT \`FK_65283be59094a73fed31ffeee4e\` FOREIGN KEY (\`ownerId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`CallMembersProfile\`
            ADD CONSTRAINT \`FK_8c8a9e0c7f1de68e7c224bd812b\` FOREIGN KEY (\`callRoomId\`) REFERENCES \`call_room\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`CallMembersProfile\`
            ADD CONSTRAINT \`FK_2e6071a3f288260887df4e70839\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`RoomParticipant\`
            ADD CONSTRAINT \`FK_6b382d96f800cb7c2b480586f59\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`RoomParticipant\`
            ADD CONSTRAINT \`FK_cc54111ce7c27f56e4d83514f33\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`RoomParticipant\` DROP FOREIGN KEY \`FK_cc54111ce7c27f56e4d83514f33\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`RoomParticipant\` DROP FOREIGN KEY \`FK_6b382d96f800cb7c2b480586f59\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`CallMembersProfile\` DROP FOREIGN KEY \`FK_2e6071a3f288260887df4e70839\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`CallMembersProfile\` DROP FOREIGN KEY \`FK_8c8a9e0c7f1de68e7c224bd812b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room\` DROP FOREIGN KEY \`FK_65283be59094a73fed31ffeee4e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_d307cd0f00be8c8efcc831102b2\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`call_room\` DROP FOREIGN KEY \`FK_d65554b5e3c256591d360527635\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`call_room\` DROP FOREIGN KEY \`FK_a2e7bdbfd1f3660a328eb7735be\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` DROP FOREIGN KEY \`FK_79fd8bfcb413d9445bb5d2662ad\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` DROP FOREIGN KEY \`FK_16657f3f9d33e6ab8b9b97b5971\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_ca49e738c1e64b0c839cae30d4e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_b368cb67ee97687c9fdc9a04153\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_cc54111ce7c27f56e4d83514f3\` ON \`RoomParticipant\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_6b382d96f800cb7c2b480586f5\` ON \`RoomParticipant\`
        `);
        await queryRunner.query(`
            DROP TABLE \`RoomParticipant\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_2e6071a3f288260887df4e7083\` ON \`CallMembersProfile\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_8c8a9e0c7f1de68e7c224bd812\` ON \`CallMembersProfile\`
        `);
        await queryRunner.query(`
            DROP TABLE \`CallMembersProfile\`
        `);
        await queryRunner.query(`
            DROP TABLE \`room\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_d307cd0f00be8c8efcc831102b\` ON \`profile\`
        `);
        await queryRunner.query(`
            DROP TABLE \`profile\`
        `);
        await queryRunner.query(`
            DROP TABLE \`profile_wallet\`
        `);
        await queryRunner.query(`
            DROP TABLE \`call_room\`
        `);
        await queryRunner.query(`
            DROP TABLE \`aid_service_profile\`
        `);
        await queryRunner.query(`
            DROP TABLE \`aid_service\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_ca49e738c1e64b0c839cae30d4\` ON \`auth\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_373ead146f110f04dad6084815\` ON \`auth\`
        `);
        await queryRunner.query(`
            DROP TABLE \`auth\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\`
        `);
        await queryRunner.query(`
            DROP TABLE \`role\`
        `);
    }

}
