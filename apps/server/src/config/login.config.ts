import { Logger } from "@nestjs/common";
import { registerAs } from "@nestjs/config";

type LoginService = "google" | "discord";
type LoginConfig<T extends LoginService> = { type: T; redirect: string };

export default registerAs("login", () => {
  const logger = new Logger("LoginConfig");
  const config: { [key in LoginService]?: LoginConfig<key> } = {};
  if (process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET) {
    logger.log("Found DISCORD login credentials.");
    config["discord"] = {
      type: "discord",
      redirect: `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.FRONTEND_HOST ?? "http://localhost:3000")}%2Foauth%2Fdiscord%2Fcallback&scope=identify+openid`,
    };
  }
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    logger.log("Found GOOGLE login credentials.");
    config["google"] = {
      type: "google",
      redirect: `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.FRONTEND_HOST ?? "http://localhost:3000")}%2Foauth%2Fgoogle%2Fcallback&scope=openid&response_type=code`,
    };
  }
  const methodsAvailableCount = Object.keys(config).length;
  if (methodsAvailableCount === 0) {
    logger.error("No Login Methods Available!");
  }
  return config;
});
