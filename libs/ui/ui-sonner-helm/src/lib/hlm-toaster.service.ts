import { Injectable } from '@angular/core';

import { toast } from 'ngx-sonner';

@Injectable({ providedIn: 'root' })
export class HlmToasterService {
  toast(...args: Parameters<typeof toast>): ReturnType<typeof toast> {
    return toast(...args);
  }

  error(...args: Parameters<typeof toast>): ReturnType<typeof toast> {
    return toast.error(...args);
  }
}
