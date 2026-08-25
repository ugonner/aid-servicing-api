"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const documentation_1 = require("./documentation");
const fs = require("fs");
const path = require("path");
const peer_gateway_1 = require("./call/peer/peer.gateway");
async function bootstrap() {
    const httpsOptions = {
        cert: fs.readFileSync(path.join(__dirname, "..", "openssl", "cert.pem")),
        key: fs.readFileSync(path.join(__dirname, "..", "openssl", "key.pem"))
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.enableCors({ origin: '*' });
    documentation_1.OpenAPIConfiguration.configureSwagger(app);
    const peerGateway = app.get(peer_gateway_1.PeerGateway);
    peerGateway.startPeerServer(app);
    const port = process.env.PORT || 8000;
    await app.listen(port, "0.0.0.0", () => console.log("Server RUnning on port", port));
}
bootstrap();
//# sourceMappingURL=main.js.map