import { configureDotEnv } from './utils/configureEnv';
import Server from './server';
import { AppDataSource } from './config/database/dataSource';

configureDotEnv();

const port = process.env.SERVER_PORT || 3000;

const connectToDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
        
    } catch (error) {
        console.error("Error during Data Source initialization", error);
        process.exit(1); 
    }
};
const initializeServer = async () => {
    await connectToDatabase();
    const server = new Server(port);
    server.listen();
  };
  
  initializeServer().catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
  })