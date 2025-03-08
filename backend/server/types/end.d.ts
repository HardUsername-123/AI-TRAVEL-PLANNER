// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    JWT_SECRET: string;
    // Add other environment variables here as needed
  }
}
