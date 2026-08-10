"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TalkableModule = void 0;
const common_1 = require("@nestjs/common");
const talkable_service_1 = require("./talkable.service");
const talkable_gateway_1 = require("./talkable.gateway");
const talkable_controller_1 = require("./talkable.controller");
let TalkableModule = class TalkableModule {
};
exports.TalkableModule = TalkableModule;
exports.TalkableModule = TalkableModule = __decorate([
    (0, common_1.Module)({
        providers: [
            talkable_service_1.TalkableService,
            {
                provide: 'TALKABLE_GATEWAY',
                useClass: talkable_gateway_1.TalkableGateway,
            },
        ],
        controllers: [talkable_controller_1.TalkableController],
    })
], TalkableModule);
//# sourceMappingURL=talkable.module.js.map