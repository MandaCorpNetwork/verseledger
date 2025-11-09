import { registerAs } from "@nestjs/config";

export default registerAs("credentials", () => ({
  google: {
    id: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
  },
  discord: {
    id: process.env.DISCORD_CLIENT_ID,
    secret: process.env.DISCORD_CLIENT_SECRET,
    bot: {
      token: process.env.DISCORD_CLIENT_TOKEN,
    },
  },
}));
