import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { withComponentInputBinding } from '@angular/router';

import { provideTrpcClient } from '@notion-clone/api/client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch()),

    provideTrpcClient(),
  ],
};
