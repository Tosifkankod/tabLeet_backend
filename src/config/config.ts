import { config } from "dotenv";

config();

export default {
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,
};
