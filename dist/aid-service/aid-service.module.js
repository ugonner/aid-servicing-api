"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AidServiceModule = void 0;
const common_1 = require("@nestjs/common");
const aid_service_service_1 = require("./aid-service.service");
const aid_service_controller_1 = require("./aid-service.controller");
const file_upload_module_1 = require("../file-upload/file-upload.module");
const notification_module_1 = require("../notifiction/notification.module");
let AidServiceModule = class AidServiceModule {
};
exports.AidServiceModule = AidServiceModule;
exports.AidServiceModule = AidServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            file_upload_module_1.FileUploadModule,
            notification_module_1.NotificationModule
        ],
        providers: [aid_service_service_1.AidServiceService],
        controllers: [aid_service_controller_1.AidServiceController]
    })
], AidServiceModule);
//# sourceMappingURL=aid-service.module.js.map