"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailjetService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");
const Mailjet = require('node-mailjet');
let MailjetService = class MailjetService {
    constructor() {
        this.mailjet = Mailjet.apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);
    }
    compileTemplate(templatePath, data) {
        const templateSource = fs.readFileSync(templatePath, 'utf8');
        const template = handlebars.compile(templateSource);
        return template(data);
    }
    async sendEmail(dto) {
        try {
            const { to, subject, context, template } = dto;
            const templatePath = path.join(__dirname, "..", '../templates', template || "generals/general.hbs");
            if (context.entries) {
                context.entriesData = Object.entries(context.entries);
            }
            ;
            const htmlBody = this.compileTemplate(templatePath, context);
            const request = await this.mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [
                    {
                        From: {
                            Email: process.env.MAIL_FROM_EMAIL || "care@skinbeautycosmetics1st.com",
                            Name: process.env.MAIL_FROM_NAME || "Skin Beauty Cosmetics",
                        },
                        To: to.map((email) => ({
                            Email: email,
                            Name: email.split('@')[0],
                        })),
                        Subject: subject,
                        HTMLPart: htmlBody,
                    },
                ],
            });
            return request.body;
        }
        catch (error) {
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }
};
exports.MailjetService = MailjetService;
exports.MailjetService = MailjetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailjetService);
//# sourceMappingURL=mailjet.service.js.map