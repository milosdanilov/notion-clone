import { inject, InjectionToken, Provider } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

import { SupabaseStorageClient } from '@notion-clone/core';

const SUPABASE_CLIENT = new InjectionToken<SupabaseClient>(
  '@notion-clone SUPABASE_CLIENT',
);

export const provideSupabaseClient = (
  createClientFn: () => SupabaseClient,
): Provider => {
  return {
    provide: SUPABASE_CLIENT,
    useValue: createClientFn(),
  };
};

export const STORAGE_CLIENT = new InjectionToken<SupabaseStorageClient>(
  '@notion-clone STORAGE_CLIENT',
);

export const provideStorageBrowserClient = (): Provider => {
  return {
    provide: STORAGE_CLIENT,
    useFactory: () => {
      const supabaseClient = inject(SUPABASE_CLIENT);
      return new SupabaseStorageClient(supabaseClient);
    },
    deps: [SUPABASE_CLIENT],
  };
};

export function injectStorageBrowserClient() {
  return inject(STORAGE_CLIENT);
}
