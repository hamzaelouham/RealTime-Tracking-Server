import * as dotenv from "dotenv";

dotenv.config();

export default {
  corsOrigin: process.env.APP_URL || "http://localhost:3000",
  port: process.env.PORT,
  host: process.env.HOST || "localhost",
  database_uri: process.env.DATABASE_URI,
  firebase_secret: require("./admin.json"),
  // process.env.FIREBASE_SECRET ||
};
