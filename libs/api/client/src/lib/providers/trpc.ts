import { AppRouter } from '@notion-clone/api/server';

import { createTrpcClient } from '@analogjs/trpc';
import { inject } from '@angular/core';

export const { provideTrpcClient, TrpcClient } = createTrpcClient<AppRouter>({
  url: '/api/trpc',
});

export function injectTrpcClient() {
  return inject(TrpcClient);
}
