import 'reflect-metadata';
import { setupModels } from './database/connection';
import { json, urlencoded, Request, Response, NextFunction } from 'express';
import * as swagger from 'swagger-express-ts';
import cors from 'cors';
import '@Controllers/v1';
import './DTO';
import { InversifyExpressServer } from 'inversify-express-utils';

import chalk from 'chalk';
import { bindContainer } from './containerBindings';
import { container } from './infrastructure/ioc/ioc.container';
import { EnvService } from '@Services/env.service';
import { AuthProvider } from './authProviders/auth.provider';
import { NetworkError } from '@Errors/NetworkError';
import { NotFoundError } from '@Errors/NotFoundError';
import { Logger } from './utils/Logger';
import { methodToColor } from './utils/methodToColor';
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
        origin: [
          `http://localhost:3000`,
          `http://localhost:${env.EXPRESS_PORT}`,
        ],
      }),
    );
    app.use((req, res, next) => {
      const method = methodToColor(req.method);
      Logger.withType(
        chalk.bgMagenta('[NETWORK]'),
        `${req.ip} - ${method} ${chalk.underline(req.path)}`,
      );
      next();
    });
    app
      .disable('x-powered-by')
      .use(json())
      .use(urlencoded({ extended: true }));
    app.use(
      swagger.express({
        definition: {
          info: {
            title: 'VerseLedger API',
            version: '1.0',
          },
          models: {
            ContractArray: { properties: {} },
            Unknown: { properties: {} },
          },
          securityDefinitions: {
            VLAuthAccessToken: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
            },
            VLAuthRefreshToken: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
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
    } else {
      console.error(err);
      res.status(500).send('An unexpected error has occured');
    }
  });
  app.listen(env.EXPRESS_PORT, () => {
    Logger.info(`App listening on port ${env.EXPRESS_PORT}`);
  });
};
