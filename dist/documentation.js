"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAPIConfiguration = void 0;
const swagger_1 = require("@nestjs/swagger");
class OpenAPIConfiguration {
    static configureSwagger(app) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('DBC API Doc')
            .setDescription('Documentation of the DBC API')
            .addBearerAuth({
            type: "http",
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'Authorization',
            description: 'Enter JWT token',
            in: 'header',
        }, 'access-token').build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('docs', app, document, {
            swaggerOptions: {
                persistAuthorization: true,
                tryItOutEnabled: true,
                showRequestDuration: true,
                docExpansion: 'none',
            },
        });
    }
}
exports.OpenAPIConfiguration = OpenAPIConfiguration;
//# sourceMappingURL=documentation.js.map