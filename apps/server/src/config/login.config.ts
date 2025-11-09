import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  port: Number.parseInt(process.env.PORT, 10) || 3030,
  secret: process.env.AUTH_SECRET ?? "placeholder",
}));
