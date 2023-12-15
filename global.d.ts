declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      readonly FOO: string;
    }
  }
}

export {};
