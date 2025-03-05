import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiData, EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';

import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/brain/popover';

import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';

import { NOOP } from '@notion-clone/core';

export type Emoji = EmojiData;

@Component({
  selector: 'ui-emoji-picker',
  imports: [
    CommonModule,
    PickerComponent,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    HlmPopoverContentDirective,
    FormsModule,
  ],
  template: `
    <div class="flex items-center">
      <brn-popover>
        <button brnPopoverTrigger type="button">
          {{ emoji }}
        </button>
        <div
          class="p-0 border-none"
          hlmPopoverContent
          *brnPopoverContent="let ctx">
          <emoji-mart
            (emojiSelect)="selectEmoji($event)"
            [enableSearch]="false" />
        </div>
      </brn-popover>
      <input
        type="hidden"
        [attr.name]="name()"
        [ngModel]="emoji"
        [ngModelOptions]="{ standalone: true }" />
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: EmojiPickerComponent,
    },
  ],
})
export class EmojiPickerComponent implements ControlValueAccessor {
  protected emoji = '';

  onChange: (emoji: string) => void = NOOP;

  onTouched: () => void = NOOP;

  name = input.required<string>();

  selectEmoji(event: EmojiEvent) {
    this.emoji = event.emoji.native || event.emoji.text;
    this.onTouched();

    this.onChange(this.emoji);
  }

  writeValue(emoji: string): void {
    this.emoji = emoji;
  }

  registerOnChange(fn: (emoji: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
