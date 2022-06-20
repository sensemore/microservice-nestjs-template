import { Module } from "@nestjs/common";
import * as path from "path";
import {
  AcceptLanguageResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver,
} from "nestjs-i18n";
import * as Joi from "joi";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "./logger/logger.module";

const importExports = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ["config/local.env", "config/production.env"],
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid("local", "development", "production", "test")
        .default("development"),
      PORT: Joi.number().default(3000),
    }),
  }),
  I18nModule.forRoot({
    parser: I18nJsonParser,
    fallbackLanguage: "en",
    parserOptions: {
      path: path.join(__dirname, "../i18n/"),
      watch: true,
    },
    resolvers: [
      { use: QueryResolver, options: ["lang"] },
      AcceptLanguageResolver,
    ],
  }),
  LoggerModule,
];

@Module({
  imports: importExports,
  controllers: [],
  exports: importExports,
})
export class GlobalModules {}
