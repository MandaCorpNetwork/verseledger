import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  type: (process.env.DATABASE_DRIVER as "sqlite") || "sqlite",
  database: (process.env.DATABASE_DATABASE as "data.sqlite") || "data.sqlite",
  host: process.env.DATABASE_HOST,
  port: Number.parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
}));
