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
exports.SubscribeToTopicDto = exports.CreateNotificationDto = exports.NotificationDto = exports.CreateNotificationTokenDto = exports.DeviceTokenDto = exports.PushStatus = exports.DeviceType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const notification_enum_1 = require("../enums/notification.enum");
const user_entity_1 = require("../../entities/user.entity");
var DeviceType;
(function (DeviceType) {
    DeviceType["ANDROID"] = "android";
    DeviceType["IOS"] = "ios";
    DeviceType["WEB"] = "web";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
var PushStatus;
(function (PushStatus) {
    PushStatus["ENABLE"] = "ACTIVE";
    PushStatus["DISABLE"] = "INACTIVE";
})(PushStatus || (exports.PushStatus = PushStatus = {}));
class DeviceTokenDto {
}
exports.DeviceTokenDto = DeviceTokenDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeviceTokenDto.prototype, "device_token", void 0);
class CreateNotificationTokenDto {
}
exports.CreateNotificationTokenDto = CreateNotificationTokenDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(DeviceType),
    __metadata("design:type", String)
], CreateNotificationTokenDto.prototype, "device_type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationTokenDto.prototype, "device_token", void 0);
class NotificationDto {
}
exports.NotificationDto = NotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], NotificationDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(notification_enum_1.NotificationEventType),
    __metadata("design:type", String)
], NotificationDto.prototype, "notificationEventType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(notification_enum_1.NotificationContext),
    __metadata("design:type", String)
], NotificationDto.prototype, "context", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], NotificationDto.prototype, "contextEntityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", user_entity_1.Profile)
], NotificationDto.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], NotificationDto.prototype, "receivers", void 0);
class CreateNotificationDto extends NotificationDto {
}
exports.CreateNotificationDto = CreateNotificationDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "user_id", void 0);
class SubscribeToTopicDto extends DeviceTokenDto {
}
exports.SubscribeToTopicDto = SubscribeToTopicDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], SubscribeToTopicDto.prototype, "topics", void 0);
//# sourceMappingURL=notification.dto.js.map