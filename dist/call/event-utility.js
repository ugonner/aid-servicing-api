"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventUtility = void 0;
class EventUtility {
    static AttachRouterEventHandlers(router, server, room) {
        router.on("@close", () => {
            server.to(room).emit("routerClosed", {});
        });
    }
}
exports.EventUtility = EventUtility;
//# sourceMappingURL=event-utility.js.map