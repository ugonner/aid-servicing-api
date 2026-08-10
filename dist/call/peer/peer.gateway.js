"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerGateway = void 0;
const peer_1 = require("peer");
class PeerGateway {
    onModuleInit() {
        console.log("peer gateway started");
    }
    async startPeerServer(app) {
        try {
            const httpServer = app.getHttpServer();
            const peerServer = (0, peer_1.ExpressPeerServer)(httpServer, {
                path: "/peerjs",
                allow_discovery: true,
                corsOptions: { origin: "*" }
            });
            peerServer.on("connection", (peer) => {
                console.log("Peer connected:", peer.getId());
            });
            peerServer.on("disconnect", (peer) => {
                console.log("Peer Disconnected:", peer.getId());
            });
            peerServer.on("error", (error) => {
                console.log("Peer Error:", error.message);
            });
            app.use("/peerjs", peerServer);
            console.log("peer server started");
        }
        catch (error) {
            console.log("Error starting peer server", error.message);
        }
    }
}
exports.PeerGateway = PeerGateway;
//# sourceMappingURL=peer.gateway.js.map