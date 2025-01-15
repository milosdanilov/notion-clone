import { Component, effect, input } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';

import { AuthUser } from '@supabase/supabase-js';

@Component({
  selector: 'nc-dashboard-setup',
  standalone: true,
  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
  ],
  template: `
    <section hlmCard class="w-[800px] h-screen sm:h-auto">
      <div hlmCardHeader>
        <h3 hlmCardTitle>Create A Workspace</h3>
        <p hlmCardDescription>
          Lets create a private workspace to get you started. You can add
          collaborators later from the workspace settings tab.
        </p>
      </div>
      <div hlmCardContent>
        <form>
          <div class="flex flex-col gap-4"></div>
        </form>
      </div>
    </section>
  `,
})
export class DashboardSetupComponent {
  subscription = input<object | null>();
  user = input<AuthUser>();
}
