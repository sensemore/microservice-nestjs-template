import { ValidationError, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AllExceptionFilter } from "./infrastructure/common/filter/exception.filter";
import { LoggingInterceptor } from "./infrastructure/common/interceptors/logger.interceptor";
import {
  ResponseFormat,
  ResponseInterceptor,
} from "./infrastructure/common/interceptors/response.interceptor";
import { LoggerService } from "./infrastructure/logger/logger.service";
import { I18nService } from "nestjs-i18n";
import helmet from "helmet";
import { RestModule } from "rest.module";
import { AMQPModule } from "amqp.module";
// somewhere in your initialization file
import { ConfigService } from "@nestjs/config";
import { ValidationException } from "infrastructure/common/validation.exception";
import { ValidationFilter } from "infrastructure/common/filter/validation.filter";

async function bootstrap_amqp() {
  const env = process.env.NODE_ENV;
  const amqpApp = await NestFactory.create(AMQPModule);
  amqpApp.init();
}

async function bootstrap_rest() {
  const env = process.env.NODE_ENV;
  const restApp = await NestFactory.create(RestModule);

  restApp.use(helmet());

  const allExceptionFilter =
    restApp.get<AllExceptionFilter>(AllExceptionFilter);
  restApp.useGlobalFilters(allExceptionFilter);
  const validationFilter = restApp.get<ValidationFilter>(ValidationFilter);
  restApp.useGlobalFilters(validationFilter);

  restApp.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        return new ValidationException(errors);
      },
    })
  );
  // interceptors
  restApp.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  restApp.useGlobalInterceptors(new ResponseInterceptor());

  // base routing
  restApp.setGlobalPrefix("api_v1");

  let configService = await restApp.resolve<ConfigService>(ConfigService);

  // swagger config
  if (env !== "production") {
    const swaggerConfig = new DocumentBuilder()
      .addBearerAuth()
      .setTitle("Clean Architecture Nestjs")
      .setDescription("Example with todo list")
      .setVersion("1.0")
      .build();
    const document = SwaggerModule.createDocument(restApp, swaggerConfig, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup("api", restApp, document);
  }

  const port = configService.get<number>("PORT");
  await restApp.listen(port);
}

function bootstrap() {
  bootstrap_amqp();
  bootstrap_rest();
}

bootstrap();
