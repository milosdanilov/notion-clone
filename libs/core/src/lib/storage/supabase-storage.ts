import { SupabaseClient } from '@supabase/supabase-js';

export class SupabaseStorageClient {
  constructor(private client: SupabaseClient) {}

  uploadWorkspaceLogo(workspaceUUID: string, logo: File) {
    return this.client.storage
      .from('workspace-logos')
      .upload(`workspaceLogo.${workspaceUUID}`, logo, {
        cacheControl: '3600',
        upsert: true,
      });
  }
}
