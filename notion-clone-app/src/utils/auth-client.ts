import { EventHandlerRequest, H3Event } from 'h3';

import { SupabaseAuthClient } from '@notion-clone/core';

import { createSupabaseClientFactory } from './supabase-base-client';

export const createAuthClient = (event: H3Event<EventHandlerRequest>) => {
  return new SupabaseAuthClient(createSupabaseClientFactory(event));
};
