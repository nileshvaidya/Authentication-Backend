import dotenv from "dotenv";

dotenv.config();

module.exports = {
  MONGO_IP : process.env.MONGO_IP || "mongo",
  MONGO_PORT : process.env.MONGO_PORT! || 27017,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_DBNAME: process.env.MONGO_DBNAME || "test",
  PORT: process.env.PORT || 9000,
  JWT_KEY: process.env.JWT_KEY!,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  JWT_ACCESS_SECRET :  process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET :  process.env.JWT_REFRESH_SECRET,
  REDIS_URL : process.env.REDIS_URL
}
// export const DB_URL = process.env.DB_URL! || "mongo",
// export const PORT = process.env.PORT || 9000;