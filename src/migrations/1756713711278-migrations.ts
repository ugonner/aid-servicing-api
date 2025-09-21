import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1756713711278 implements MigrationInterface {
    name = 'Migrations1756713711278'

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
            CREATE TABLE \`tag\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`aid_service_tag\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`tagId\` int NULL,
                \`aidServiceId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`payment_transaction\` (
                \`id\` varchar(36) NOT NULL,
                \`paymentRef\` varchar(255) NULL,
                \`paymentMethod\` varchar(255) NOT NULL,
                \`paymentStatus\` varchar(255) NOT NULL,
                \`paymentPurpose\` varchar(255) NOT NULL,
                \`amount\` int NOT NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`bookingId\` int NULL,
                \`profileId\` int NULL,
                UNIQUE INDEX \`REL_a0df4573f2a0c4d351fea2c598\` (\`bookingId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`booking\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`compositeBookingId\` varchar(255) NOT NULL,
                \`bookingStatus\` varchar(255) NOT NULL DEFAULT 'Pending',
                \`bookingStatusNote\` varchar(255) NULL,
                \`paymentStatus\` varchar(255) NOT NULL DEFAULT 'Not paid',
                \`totalAmount\` int NOT NULL DEFAULT '0',
                \`bookingNote\` varchar(255) NULL,
                \`locationAddress\` json NULL,
                \`virtualLocationAddress\` json NULL,
                \`startDate\` varchar(255) NOT NULL,
                \`endDate\` varchar(255) NOT NULL,
                \`duration\` int NOT NULL DEFAULT '0',
                \`isMatched\` tinyint NOT NULL DEFAULT 0,
                \`confirmedByProvider\` tinyint NOT NULL DEFAULT 0,
                \`confirmedByUser\` tinyint NOT NULL DEFAULT 0,
                \`isVirtualLocation\` tinyint NOT NULL DEFAULT 0,
                \`rating\` float NOT NULL DEFAULT '0',
                \`review\` varchar(255) NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`aidServiceId\` int NULL,
                \`aidServiceProfileId\` int NULL,
                \`profileId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`profile_cluster\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`clusterId\` int NULL,
                \`profileId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`cluster\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`description\` varchar(255) NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`aid_service_cluster\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`clusterId\` int NULL,
                \`aidServiceId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`aid_service\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`description\` varchar(255) NULL,
                \`avatar\` varchar(255) NULL,
                \`noOfAidServiceProfiles\` int NULL DEFAULT '0',
                \`audioCallRate\` int NULL,
                \`videoCallRate\` int NULL,
                \`onSiteRate\` int NULL,
                \`virtualServiceRate\` int NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`profileId\` int NULL,
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
                \`virtualServiceEarnings\` int NOT NULL DEFAULT '0',
                \`totalEarningsBalance\` int NOT NULL DEFAULT '0',
                \`noOfAudioCallServices\` int NOT NULL DEFAULT '0',
                \`noOfVideoCallServices\` int NOT NULL DEFAULT '0',
                \`noOfOnSiteServices\` int NOT NULL DEFAULT '0',
                \`noOfVirtualServices\` int NOT NULL DEFAULT '0',
                \`totalServicesRendered\` int NOT NULL DEFAULT '0',
                \`businessDocumentUrl\` varchar(255) NULL,
                \`mediaFile\` varchar(255) NULL,
                \`contactPhoneNumber\` varchar(255) NULL,
                \`socialMediaLinks\` json NULL,
                \`locationAddress\` json NULL,
                \`verificationComment\` varchar(255) NULL,
                \`averageRating\` float NOT NULL DEFAULT '0',
                \`noOfRatings\` float NOT NULL DEFAULT '0',
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`verifiedById\` int NULL,
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
                \`rating\` float NOT NULL DEFAULT '0',
                \`review\` varchar(255) NULL,
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
                \`fundedBalance\` float(2) NOT NULL DEFAULT '0',
                \`earnedBalance\` float(2) NOT NULL DEFAULT '0',
                \`pendingBalance\` float(2) NOT NULL DEFAULT '0',
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
                \`profile_id\` int NULL,
                \`entityOwnerId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`report_comment\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`comment\` varchar(255) NOT NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`profileId\` int NULL,
                \`reportId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`notification\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`description\` varchar(255) NULL,
                \`data\` json NULL,
                \`avatar\` varchar(255) NULL,
                \`notificationEventType\` varchar(255) NOT NULL,
                \`context\` varchar(255) NOT NULL,
                \`contextEntityId\` int NULL,
                \`viewed\` tinyint NOT NULL DEFAULT 0,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`isDeleted\` tinyint NOT NULL DEFAULT 0,
                \`creatorId\` int NULL,
                \`receiverId\` int NULL,
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
            ALTER TABLE \`aid_service_tag\`
            ADD CONSTRAINT \`FK_c8e96e96979cd2bf2afd75e91d2\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_tag\`
            ADD CONSTRAINT \`FK_81a7eb4e5de9ec5fc0f0d548b37\` FOREIGN KEY (\`aidServiceId\`) REFERENCES \`aid_service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`payment_transaction\`
            ADD CONSTRAINT \`FK_a0df4573f2a0c4d351fea2c5986\` FOREIGN KEY (\`bookingId\`) REFERENCES \`booking\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`payment_transaction\`
            ADD CONSTRAINT \`FK_e25ef1ea9f15b50d4aa150731a1\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`booking\`
            ADD CONSTRAINT \`FK_9f755d011b9b8199461aaa06613\` FOREIGN KEY (\`aidServiceId\`) REFERENCES \`aid_service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`booking\`
            ADD CONSTRAINT \`FK_1dc4b236b764ed8d1552eff2434\` FOREIGN KEY (\`aidServiceProfileId\`) REFERENCES \`aid_service_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`booking\`
            ADD CONSTRAINT \`FK_e92ee85850420c227ec980ce76c\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile_cluster\`
            ADD CONSTRAINT \`FK_d97aad3ecb862bab0f395747f3c\` FOREIGN KEY (\`clusterId\`) REFERENCES \`cluster\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile_cluster\`
            ADD CONSTRAINT \`FK_b1e2c1cc3a940ed52b1ea664477\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_cluster\`
            ADD CONSTRAINT \`FK_425b0a6f642f091a9a49975d8f0\` FOREIGN KEY (\`clusterId\`) REFERENCES \`cluster\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_cluster\`
            ADD CONSTRAINT \`FK_bb1c821ee7b4c78c4ca909d657d\` FOREIGN KEY (\`aidServiceId\`) REFERENCES \`aid_service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service\`
            ADD CONSTRAINT \`FK_bf0c29f8bba419447fde8fbed43\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_profile\`
            ADD CONSTRAINT \`FK_30f9690697699badf6c50a3fee5\` FOREIGN KEY (\`verifiedById\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE \`report\`
            ADD CONSTRAINT \`FK_72e61826547d60306404d4786ea\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`report\`
            ADD CONSTRAINT \`FK_e66c500f263ab1aaaf63f501d51\` FOREIGN KEY (\`entityOwnerId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`report_comment\`
            ADD CONSTRAINT \`FK_3f3504bbd85a4bc8546ac4d1392\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`report_comment\`
            ADD CONSTRAINT \`FK_78fb2f5b494cf91bc899f28ead7\` FOREIGN KEY (\`reportId\`) REFERENCES \`report\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`notification\`
            ADD CONSTRAINT \`FK_dd9610f49f6281c705287cf8e67\` FOREIGN KEY (\`creatorId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`notification\`
            ADD CONSTRAINT \`FK_758d70a0e61243171e785989070\` FOREIGN KEY (\`receiverId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_758d70a0e61243171e785989070\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_dd9610f49f6281c705287cf8e67\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`report_comment\` DROP FOREIGN KEY \`FK_78fb2f5b494cf91bc899f28ead7\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`report_comment\` DROP FOREIGN KEY \`FK_3f3504bbd85a4bc8546ac4d1392\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_e66c500f263ab1aaaf63f501d51\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_72e61826547d60306404d4786ea\`
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
            ALTER TABLE \`aid_service\` DROP FOREIGN KEY \`FK_bf0c29f8bba419447fde8fbed43\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_cluster\` DROP FOREIGN KEY \`FK_bb1c821ee7b4c78c4ca909d657d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`aid_service_cluster\` DROP FOREIGN KEY \`FK_425b0a6f642f091a9a49975d8f0\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile_cluster\` DROP FOREIGN KEY \`FK_b1e2c1cc3a940ed52b1ea664477\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`profile_cluster\` DROP FOREIGN KEY \`FK_d97aad3ecb862bab0f395747f3c\`
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
            ALTER TABLE \`payment_transaction\` DROP FOREIGN KEY \`FK_e25ef1ea9f15b50d4aa150731a1\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`payment_transaction\` DROP FOREIGN KEY \`FK_a0df4573f2a0c4d351fea2c5986\`
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
            DROP TABLE \`notification\`
        `);
        await queryRunner.query(`
            DROP TABLE \`report_comment\`
        `);
        await queryRunner.query(`
            DROP TABLE \`report\`
        `);
        await queryRunner.query(`
            DROP TABLE \`review_and_rating\`
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
            DROP TABLE \`aid_service_cluster\`
        `);
        await queryRunner.query(`
            DROP TABLE \`cluster\`
        `);
        await queryRunner.query(`
            DROP TABLE \`profile_cluster\`
        `);
        await queryRunner.query(`
            DROP TABLE \`booking\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_a0df4573f2a0c4d351fea2c598\` ON \`payment_transaction\`
        `);
        await queryRunner.query(`
            DROP TABLE \`payment_transaction\`
        `);
        await queryRunner.query(`
            DROP TABLE \`aid_service_tag\`
        `);
        await queryRunner.query(`
            DROP TABLE \`tag\`
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
