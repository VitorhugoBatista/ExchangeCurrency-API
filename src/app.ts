import Server from './server';
import { configureDotEnv } from './utils/configureEnv';
import { AppDataSource } from './config/database/dataSource';

const configureApp = async () => {
  configureDotEnv();
  const port = process.env.SERVER_PORT || 3000;

  try {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized!");
  } catch (error) {
      console.error("Error during Data Source initialization", error);
      process.exit(1); 
  }

  const server = new Server(port);
  server.start();
};

export default configureApp;