import { H3Event } from 'h3';

export interface User {
  id: string;
}

export interface Context {
  user: User;
}

export type CreateContextFn = (event: H3Event) => Promise<Context>;
