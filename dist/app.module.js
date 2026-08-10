"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const call_module_1 = require("./call/call.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const notification_module_1 = require("./notifiction/notification.module");
const aid_service_module_1 = require("./aid-service/aid-service.module");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const mail_module_1 = require("./mail/mail.module");
const talkable_module_1 = require("./talkable/talkable.module");
const file_upload_module_1 = require("./file-upload/file-upload.module");
const path = require("path");
const booking_module_1 = require("./booking/booking.module");
const review_module_1 = require("./review/review.module");
const report_module_1 = require("./report/report.module");
const transaction_module_1 = require("./transaction/transaction.module");
const ocr_module_1 = require("./ocr/ocr.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            talkable_module_1.TalkableModule,
            call_module_1.CallModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => ({
                    type: "postgres",
                    host: process.env.DATABASE_HOST,
                    port: Number(process.env.DATABASE_PORT),
                    username: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASSWORD,
                    database: process.env.DATABASE_NAME,
                    entities: ['dist/**/*.entity.js'],
                    synchronize: false,
                    ssl: process.env.NODE_ENV === 'production'
                        ? { rejectUnauthorized: false }
                        : false,
                }),
                inject: [config_1.ConfigService]
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            notification_module_1.NotificationModule,
            aid_service_module_1.AidServiceModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: `${process.env.NODEMAILER_HOST}`,
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.NODEMAILER_USER,
                        pass: process.env.NODEMAILER_PASS
                    },
                },
                defaults: {
                    from: `${process.env.NODEMAILER_USERNAME} <${process.env.NODEMAILER_USER}>`,
                },
                template: {
                    dir: path.join(__dirname, '../src/mail/templates'),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            mail_module_1.MailModule,
            file_upload_module_1.FileUploadModule,
            booking_module_1.BookingModule,
            review_module_1.ReviewModule,
            report_module_1.ReportModule,
            notification_module_1.NotificationModule,
            transaction_module_1.TransactionModule,
            ocr_module_1.OCRModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map