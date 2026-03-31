"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    const corsWhitelist = configService.get('ENABLE_CORS')?.split(',') || [];
    if (corsWhitelist.length > 0) {
        app.enableCors({
            origin: (origin, callback) => {
                if (!origin || corsWhitelist.includes(origin)) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true,
        });
    }
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('InsureTech API')
        .setDescription('API documentation for the InsureTech backend service.')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Auth', 'Authentication and authorization')
        .addTag('Users', 'User management')
        .addTag('Dashboard', 'Dashboard KPI metrics')
        .addTag('Complexes', 'Complex management')
        .addTag('Policies', 'Policy management')
        .addTag('Claims', 'Claim management')
        .addTag('Documents', 'Document management')
        .addTag('Approvals', 'Approval management')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api-doc', app, document);
    const port = configService.get('PORT', 8080);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map