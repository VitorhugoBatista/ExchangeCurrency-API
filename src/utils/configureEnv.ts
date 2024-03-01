import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { ErrorHandler } from "./errorHandler";

export const configureDotEnv = () => {
  function findProjectRoot(currentDir: string): string {
    if (fs.existsSync(path.join(currentDir, ".env"))) {
      return currentDir;
    } else {
      const parentDir = path.resolve(currentDir, "..");
      if (parentDir === currentDir) {
        throw new ErrorHandler(".env file not found", "GENERAL");
      }
      return findProjectRoot(parentDir);
    }
  }

  try {
    const projectRoot = findProjectRoot(__dirname);
    dotenv.config({ path: path.resolve(projectRoot, ".env") });
  } catch (error) {
    console.error(`error configuring .env file: ${error}`);
  }
};
