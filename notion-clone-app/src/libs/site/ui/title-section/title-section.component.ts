import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nc-title-section',
  imports: [CommonModule],
  templateUrl: './title-section.component.html',
})
export class TitleSectionComponent {
  @Input()
  pill!: string;

  @Input()
  subheading?: string;

  @Input()
  title?: string;
}
