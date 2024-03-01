declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT:number;
      API_EXCHANGE_URL: string;
      EXCHANGE_RATE_API_KEY: string;
    }
  }
}

export {};