import { Logger } from '@/utils/Logger';
import { Sequelize } from 'sequelize-typescript';
import chalk from 'chalk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupModels = (env: {
  MYSQL_DATABASE: string;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_HOST: string;
  MYSQL_PORT: number;
}) => {
  return new Sequelize({
    database: env.MYSQL_DATABASE,
    dialect: 'mysql',
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    host: env.MYSQL_HOST,
    port: Number(env.MYSQL_PORT),
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
};
