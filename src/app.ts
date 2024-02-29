import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import Server from './server';
import { AppDataSource } from './config/database/dataSource';

const configureApp = async () => {
  try {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized!");
  } catch (error) {
      console.error("Error during Data Source initialization", error);
      process.exit(1);
  }

  const server = new Server();
  server.start();
};

configureApp().catch(error => {
    console.error("Failed to configure the application", error);
    process.exit(1);
});