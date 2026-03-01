declare namespace NodeJS {
  interface ProcessEnv {
    readonly GEMINI_API_KEY: string;
    readonly UNSPLASH_ACCESS_KEY: string;
    readonly STRIPE_SECRET_KEY: string;
  }
}
