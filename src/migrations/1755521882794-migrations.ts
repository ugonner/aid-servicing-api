import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1755521882794 implements MigrationInterface {
    name = 'Migrations1755521882794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`review_and_rating\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`rating\` int NOT NULL,
                \`review\` varchar(255) NULL,
                \`serviceType\` varchar(255) NOT NULL,
                \`serviceTypeEntityId\` int NOT NULL,
                \`profileId\` int NOT NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`report\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`rating\` int NOT NULL,
                \`review\` varchar(255) NULL,
                \`serviceType\` varchar(255) NOT NULL,
                \`serviceTypeEntityId\` int NOT NULL,
                \`profileId\` int NOT NULL,
                \`isResolved\` tinyint NOT NULL DEFAULT 0,
                \`resolvedById\` int NULL,
                \`comment\` varchar(255) NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);

        await queryRunner.query(`
            ALTER TABLE \`booking\`
            ADD \`rating\` float NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE \`booking\`
            ADD \`review\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\`
            ADD \`averageRating\` float NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\`
            ADD \`noOfRatings\` float NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE \`call_room\`
            ADD \`rating\` float NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE \`call_room\`
            ADD \`review\` varchar(255) NULL
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
            ALTER TABLE \`aid_service_profile\` DROP FOREIGN KEY \`FK_30f9690697699badf6c50a3fee5\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_e92ee85850420c227ec980ce76c\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_1dc4b236b764ed8d1552eff2434\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_9f755d011b9b8199461aaa06613\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_tag\` DROP FOREIGN KEY \`FK_81a7eb4e5de9ec5fc0f0d548b37\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_tag\` DROP FOREIGN KEY \`FK_c8e96e96979cd2bf2afd75e91d2\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_ca49e738c1e64b0c839cae30d4e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_b368cb67ee97687c9fdc9a04153\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room\` CHANGE \`ownerId\` \`ownerId\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`room\` DROP COLUMN \`aidServiceProviders\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room\`
            ADD \`aidServiceProviders\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`room\`
            ADD CONSTRAINT \`FK_65283be59094a73fed31ffeee4e\` FOREIGN KEY (\`ownerId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile_wallet\` CHANGE \`pendingBalance\` \`pendingBalance\` float(12) NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile_wallet\` CHANGE \`earnedBalance\` \`earnedBalance\` float(12) NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile_wallet\` CHANGE \`fundedBalance\` \`fundedBalance\` float(12) NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\` CHANGE \`walletId\` \`walletId\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\` CHANGE \`disabilityType\` \`disabilityType\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\` CHANGE \`gender\` \`gender\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\` CHANGE \`lastName\` \`lastName\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\` CHANGE \`firstName\` \`firstName\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile\`
            ADD CONSTRAINT \`FK_d307cd0f00be8c8efcc831102b2\` FOREIGN KEY (\`walletId\`) REFERENCES \`profile_wallet\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`call_room\` CHANGE \`initiatedById\` \`initiatedById\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`call_room\` CHANGE \`aidServiceProfileId\` \`aidServiceProfileId\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`call_room\`
            ADD CONSTRAINT \`FK_d65554b5e3c256591d360527635\` FOREIGN KEY (\`initiatedById\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`call_room\`
            ADD CONSTRAINT \`FK_a2e7bdbfd1f3660a328eb7735be\` FOREIGN KEY (\`aidServiceProfileId\`) REFERENCES \`aid_service_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` CHANGE \`aidServiceId\` \`aidServiceId\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` CHANGE \`profileId\` \`profileId\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` CHANGE \`verifiedById\` \`verifiedById\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` CHANGE \`verificationComment\` \`verificationComment\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` DROP COLUMN \`locationAddress\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\`
            ADD \`locationAddress\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` DROP COLUMN \`socialMediaLinks\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\`
            ADD \`socialMediaLinks\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` CHANGE \`contactPhoneNumber\` \`contactPhoneNumber\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` CHANGE \`mediaFile\` \`mediaFile\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` CHANGE \`businessDocumentUrl\` \`businessDocumentUrl\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\`
            ADD CONSTRAINT \`FK_79fd8bfcb413d9445bb5d2662ad\` FOREIGN KEY (\`aidServiceId\`) REFERENCES \`aid_service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\`
            ADD CONSTRAINT \`FK_16657f3f9d33e6ab8b9b97b5971\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\`
            ADD CONSTRAINT \`FK_30f9690697699badf6c50a3fee5\` FOREIGN KEY (\`verifiedById\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service\` CHANGE \`virtualServiceRate\` \`virtualServiceRate\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service\` CHANGE \`onSiteRate\` \`onSiteRate\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service\` CHANGE \`videoCallRate\` \`videoCallRate\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service\` CHANGE \`audioCallRate\` \`audioCallRate\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`booking\` CHANGE \`profileId\` \`profileId\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`booking\` CHANGE \`aidServiceProfileId\` \`aidServiceProfileId\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`booking\` CHANGE \`aidServiceId\` \`aidServiceId\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`booking\` CHANGE \`bookingNote\` \`bookingNote\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`booking\` CHANGE \`bookingStatusNote\` \`bookingStatusNote\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_tag\` CHANGE \`aidServiceId\` \`aidServiceId\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_tag\` CHANGE \`tagId\` \`tagId\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_tag\`
            ADD CONSTRAINT \`FK_81a7eb4e5de9ec5fc0f0d548b37\` FOREIGN KEY (\`aidServiceId\`) REFERENCES \`aid_service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_tag\`
            ADD CONSTRAINT \`FK_c8e96e96979cd2bf2afd75e91d2\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\` CHANGE \`profileId\` \`profileId\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\` CHANGE \`roleId\` \`roleId\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\` CHANGE \`otpTime\` \`otpTime\` datetime NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\` CHANGE \`otp\` \`otp\` int NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\` CHANGE \`lastName\` \`lastName\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\` CHANGE \`firstName\` \`firstName\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\`
            ADD CONSTRAINT \`FK_ca49e738c1e64b0c839cae30d4e\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`auth\`
            ADD CONSTRAINT \`FK_b368cb67ee97687c9fdc9a04153\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`role\` DROP COLUMN \`permissions\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`role\`
            ADD \`permissions\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`role\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'
        `);
        await queryRunner.query(`
            ALTER TABLE \`call_room\` DROP COLUMN \`review\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`call_room\` DROP COLUMN \`rating\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` DROP COLUMN \`noOfRatings\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\` DROP COLUMN \`averageRating\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`booking\` DROP COLUMN \`review\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`booking\` DROP COLUMN \`rating\`
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
            DROP TABLE \`report\`
        `);
        await queryRunner.query(`
            DROP TABLE \`review_and_rating\`
        `);
    }

}
