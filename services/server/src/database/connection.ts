import { Sequelize } from 'sequelize-typescript';
import { EnvService } from '@Services/env.service';
const env = new EnvService();
export const sequelize = new Sequelize({
  database: env.MYSQL_DATABASE,
  dialect: 'mysql',
  username: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  host: env.MYSQL_HOST,
  port: Number(env.MYSQL_PORT),
  models: [`${__dirname}/models/**/*.model.ts`],
  modelMatch: (a, b) => {
    console.log(a, b);
    return true;
  },
});
