import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiData, EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';

import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/brain/popover';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';

export type Emoji = EmojiData;

@Component({
  selector: 'ui-emoji-picker',
  standalone: true,
  imports: [
    CommonModule,
    PickerComponent,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    HlmPopoverContentDirective,
  ],
  template: `
    <div class="flex items-center">
      <brn-popover>
        <button brnPopoverTrigger type="button">
          <ng-content></ng-content>
        </button>
        <div class="p-0 border-none" hlmPopoverContent *brnPopoverContent>
          <emoji-mart (emojiClick)="selectEmoji($event)" />
        </div>
      </brn-popover>
    </div>
  `,
})
export class EmojiPickerComponent {
  emojiChange = output<string>();

  selectEmoji(event: EmojiEvent) {
    this.emojiChange.emit(event.emoji.native || event.emoji.text);
  }
}
