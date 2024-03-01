import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import Server from "./server";
import { AppDataSource } from "./config/database/dataSource";
import { Logger } from "./logger/logger";

export const configureApp = async () => {
  try {
    await AppDataSource.initialize();
    Logger.info("Data Source has been initialized!");
  } catch (error) {
    Logger.error("Error during Data Source initialization", error);
    process.exit(1);
  }

  const server = new Server();
  server.start();
};

configureApp().catch((error) => {
  Logger.error("Failed to configure the application", error);
  process.exit(1);
});

export const app = new Server().app;
