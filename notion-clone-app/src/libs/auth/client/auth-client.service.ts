import { Injectable } from '@angular/core';

import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

import { BaseSupabaseClient } from '../impl/supabase-client';

@Injectable({
  providedIn: 'root',
})
export class AuthClientService extends BaseSupabaseClient {
  override createAuthClient(): SupabaseClient {
    return createBrowserClient(
      import.meta.env['VITE_PUBLIC_SUPABASE_URL'],
      import.meta.env['VITE_PUBLIC_SUPABASE_ANON_KEY']
    );
  }
}
