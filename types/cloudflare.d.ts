/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Minimal declarations for the optional Sites/Cloudflare build target.
 * The Vercel and Supabase application layers do not depend on these bindings.
 */
declare interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

declare interface D1Database {
  prepare(query: string): any;
  batch(statements: any[]): Promise<any[]>;
  exec(query: string): Promise<any>;
  dump(): Promise<ArrayBuffer>;
}

declare module "cloudflare:workers" {
  export const env: {
    DB?: D1Database;
  };
}
