declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_TYPE: string; 
      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      API_EXCHANGE_URL: string;
      EXCHANGE_RATE_API_KEY: string;
    }
  }
}

export {};