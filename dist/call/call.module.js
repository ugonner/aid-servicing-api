"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallModule = void 0;
const common_1 = require("@nestjs/common");
const call_gateway_1 = require("./call.gateway");
const typeorm_1 = require("@nestjs/typeorm");
const room_entity_1 = require("../entities/room.entity");
const room_service_1 = require("./room.service");
const room_controller_1 = require("./room.controller");
const auth_entity_1 = require("../entities/auth.entity");
const aid_service_module_1 = require("../aid-service/aid-service.module");
const peer_gateway_1 = require("./peer/peer.gateway");
const user_module_1 = require("../user/user.module");
const call_service_1 = require("./call.service");
const notification_module_1 = require("../notifiction/notification.module");
const call_controller_1 = require("./call.controller");
let CallModule = class CallModule {
};
exports.CallModule = CallModule;
exports.CallModule = CallModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([room_entity_1.Room, auth_entity_1.Auth]),
            aid_service_module_1.AidServiceModule,
            user_module_1.UserModule,
            notification_module_1.NotificationModule
        ],
        controllers: [room_controller_1.RoomController, call_controller_1.CallController],
        providers: [
            {
                provide: "CALL_GATEWWAY",
                useClass: call_gateway_1.CallGateway
            },
            call_gateway_1.CallGateway,
            room_service_1.RoomService,
            peer_gateway_1.PeerGateway,
            call_service_1.CallService
        ],
        exports: [call_gateway_1.CallGateway]
    })
], CallModule);
//# sourceMappingURL=call.module.js.map