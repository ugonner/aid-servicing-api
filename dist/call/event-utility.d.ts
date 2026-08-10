import MediaSoup from "mediasoup";
import { Server } from "socket.io";
export declare class EventUtility {
    static AttachRouterEventHandlers(router: MediaSoup.types.Router, server: Server, room: string): void;
}
