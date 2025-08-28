import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export const config = {
  port: process.env.PORT || 3000,
  jwtsecret: process.env.JWT_SECRET!,
  version: "v1",
  frontendUrl: process.env.FRONTEND_URL!,
  email: process.env.EMAIL!,
  password: process.env.PASSWORD!,
};
