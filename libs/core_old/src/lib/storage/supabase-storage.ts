import { SupabaseClient } from '@supabase/supabase-js';

export type StorageUploadResponse =
  | {
      data: {
        id: string;
        path: string;
        fullPath: string;
      };
      error: null;
    }
  | {
      data: null;
      error: Error;
    };

export class SupabaseStorageClient {
  constructor(private client: SupabaseClient) {}

  uploadWorkspaceLogo(
    workspaceUUID: string,
    logo: File,
  ): Promise<StorageUploadResponse> {
    return this.client.storage
      .from('workspace-logos')
      .upload(`workspaceLogo.${workspaceUUID}`, logo, {
        cacheControl: '3600',
        upsert: true,
      });
  }

  getWorkspaceLogoUrl(workspaceUUID: string): string {
    return this.client.storage
      .from('workspace-logos')
      .getPublicUrl(workspaceUUID).data.publicUrl;
  }
}
