import { Injectable } from '@angular/core';

import { injectStorageBrowserClient } from '@notion-clone/api/client';

const WORKSPACE_LOGO_FALLBACK = '/assets/cypresslogo.svg';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  private storage = injectStorageBrowserClient();

  getLogoPublicUrl(workspaceLogo: string | null) {
    return workspaceLogo
      ? this.storage.getWorkspaceLogoUrl(workspaceLogo)
      : WORKSPACE_LOGO_FALLBACK;
  }
}
