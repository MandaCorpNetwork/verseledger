import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );
  app.disable("x-powered-by", "X-Powered-By");
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Verseledger API")
    .setDescription("API for interfacing with The Verseledger")
    .setVersion("3.0.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "API Token",
        description: "Enter your API token",
      },
      "bearer",
    )
    .build();

  const documentFactory = () => {
    return SwaggerModule.createDocument(app, swaggerConfig);
  };
  SwaggerModule.setup("api/docs", app, documentFactory, {
    jsonDocumentUrl: "swagger/json",
  });

  await app.listen(process.env.PORT || 3030);
}

bootstrap();
