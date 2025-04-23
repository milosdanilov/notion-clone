import { defineEventHandler } from 'h3';

import { AuthServicePort, SupabaseAuthAdapter } from '@notion-clone/auth';

import { createSupabaseClient } from '@/config';

declare module 'h3' {
  interface H3EventContext {
    authClient: AuthServicePort;
  }
}

export default defineEventHandler((event) => {
  const authClient: AuthServicePort = new SupabaseAuthAdapter(
    createSupabaseClient(event),
  );

  event.context.authClient = authClient;
});
