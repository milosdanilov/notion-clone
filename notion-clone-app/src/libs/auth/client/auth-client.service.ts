import { Injectable } from '@angular/core';

import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

import { BaseSupabaseClient } from '@notion-clone/supabase';

@Injectable({
  providedIn: 'root',
})
export class AuthClientService extends BaseSupabaseClient {
  constructor() {
    super();
    this.client = this.createAuthClient();
  }

  override createAuthClient(): SupabaseClient {
    return createBrowserClient(
      import.meta.env['VITE_PUBLIC_SUPABASE_URL'],
      import.meta.env['VITE_PUBLIC_SUPABASE_ANON_KEY']
    );
  }
}
