import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  port: Number.parseInt(process.env.PORT, 10) || 3030,
  auth_secret: process.env.AUTH_SECRET ?? "placeholder",
  frontend_host: process.env.FRONTEND_HOST ?? "http://localhost:3000",
  backend_host: process.env.BACKEND_HOST ?? "http://localhost:3030",
}));
