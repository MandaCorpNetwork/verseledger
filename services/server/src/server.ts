import 'reflect-metadata';
import { setupModels } from './connection';
import { json, urlencoded, Request, Response, NextFunction } from 'express';
import * as swagger from 'swagger-express-ts';
import cors from 'cors';
import './v1';
import './v1/DTO';
import { InversifyExpressServer } from 'inversify-express-utils';

import chalk from 'chalk';
import { bindContainer } from './containerBindings';
import { container } from './infrastructure/ioc/ioc.container';
import { EnvService } from '@V1/services/env.service';
import { AuthProvider } from './authProviders/auth.provider';
import { NetworkError } from '@V1/errors/NetworkError';
import { NotFoundError } from '@V1/errors/NotFoundError';
import { Logger } from './utils/Logger';
import { methodToColor } from './utils/methodToColor';
import { ZodError } from 'zod';
export const createServer = () => {
  bindContainer(container);
  const env = new EnvService();
  setupModels(env);
  const server = new InversifyExpressServer(
    container,
    null,
    null,
    null,
    AuthProvider,
  );
  server.setConfig((app) => {
    app.use(
      cors({
        origin: [env.FRONTEND_HOST, env.BACKEND_HOST, env.BROKER_HOST],
      }),
    );
    app.use((req, res, next) => {
      const method = methodToColor(req.method);
      const type = chalk.bold.bgMagenta('[$NET]');
      Logger.withType(
        type,
        `${req.ip} > ${chalk.cyan(req.protocol.toUpperCase())}/${chalk.cyan(req.httpVersion)} ${method} ${chalk.underline(req.path)}`,
      );
      Logger.withType(
        type,
        `${req.ip} > ${chalk.cyan('Connection')}: ${chalk.underline(req.headers.connection)}`,
      );
      Logger.withType(
        type,
        `${req.ip} > ${chalk.cyan('User-Agent')}: ${chalk.underline(req.headers['user-agent'])}`,
      );
      Logger.withType(
        type,
        `${req.ip} > ${chalk.cyan('Accept')}: ${chalk.underline(req.headers.accept)}`,
      );
      if (req.headers['content-type']) {
        Logger.withType(
          type,
          `${req.ip} > ${chalk.cyan('Content-Type')}: ${chalk.underline(req.headers['content-type'])}`,
        );
        Logger.withType(
          type,
          `${req.ip} > ${chalk.cyan('Content-Length')}: ${chalk.underline(req.headers['content-length'])}`,
        );
      }
      next();
    });
    app
      .disable('x-powered-by')
      .use(json())
      .use(urlencoded({ extended: true }));
    app.use(
      swagger.express({
        definition: {
          schemes: ['https', 'http'],
          consumes: [swagger.SwaggerDefinitionConstant.Consume.JSON],
          produces: [swagger.SwaggerDefinitionConstant.Produce.JSON],
          info: {
            title: 'VerseLedger API',
            version: '1.0',
          },
          models: {
            ContractArray: {
              properties: { TODO: { type: 'string', required: true } },
            },
            Unknown: {
              properties: { TODO: { type: 'string', required: true } },
            },
          },
          securityDefinitions: {
            VLBearerAuth: {
              type: swagger.SwaggerDefinitionConstant.Security.Type.API_KEY,
              in: swagger.SwaggerDefinitionConstant.Security.In.HEADER,
              name: 'Authorization',
            },
            VLQueryAuth: {
              type: swagger.SwaggerDefinitionConstant.Security.Type.API_KEY,
              in: swagger.SwaggerDefinitionConstant.Security.In.QUERY,
              name: 'api_key',
            },
            VLTokenAuth: {
              type: swagger.SwaggerDefinitionConstant.Security.Type.API_KEY,
              in: swagger.SwaggerDefinitionConstant.Security.In.HEADER,
              name: 'X-API-Key',
            },
          },
        },
      }),
    );
  });
  const app = server.build();

  app.use((req, res, next) => {
    next(new NotFoundError(req.path));
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: unknown, req: Request, res: Response, _: NextFunction) => {
    if (err instanceof NetworkError) {
      res.status(err.statusCode).json(err);
    } else if (err instanceof ZodError) {
      res.status(400).json(err);
    } else {
      console.error(err);
      res.status(500).send('An unexpected error has occured');
    }
  });
  app.listen(env.EXPRESS_PORT, () => {
    Logger.info(`App listening on port ${env.EXPRESS_PORT}`);
  });
};
