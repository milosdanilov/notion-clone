import { EventHandlerRequest, H3Event } from 'h3';

import { SupabaseStorageClient } from '@notion-clone/core';

import { createSupabaseClientFactory } from './supabase-base-client';

export const createStorageClient = (event: H3Event<EventHandlerRequest>) => {
  return new SupabaseStorageClient(createSupabaseClientFactory(event));
};
