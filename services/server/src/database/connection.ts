import { Sequelize } from 'sequelize-typescript';
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
    models: [`${__dirname}/models/**/*.model.ts`],
    modelMatch(a, b) {
      console.log(`Loading \x1b[33m${b}\x1b[0m from ${a}`);
      return true;
    },
    benchmark: true,
    logging(sql) {
      console.info(sql);
      return;
    },
  });
};
