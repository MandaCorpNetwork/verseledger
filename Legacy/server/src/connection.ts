import { Logger } from '@Utils/Logger';
import { Sequelize } from 'sequelize-typescript';
import chalk from 'chalk';

export const setupModels = (env: {
  MYSQL_DATABASE: string;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_HOST: string;
  MYSQL_PORT: number;
}) => {
  const connection = new Sequelize({
    database: env.MYSQL_DATABASE,
    dialect: 'mysql',
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    host: env.MYSQL_HOST,
    port: env.MYSQL_HOST === 'null' ? undefined : Number(env.MYSQL_HOST),
    models: [`${__dirname}/**/*.model.ts`],
    modelMatch(a, b) {
      Logger.info(`Loading ${chalk.yellow(b)} from ${chalk.grey(a)}`);
      return true;
    },
    benchmark: true,
    logging(sql) {
      Logger.withType(chalk.bold.bgGreen('[$SQL]'), sql);
    },
  });
  return connection;
};
