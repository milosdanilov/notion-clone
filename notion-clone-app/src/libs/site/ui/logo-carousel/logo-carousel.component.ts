import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Logo } from '../../models/logo.model';

@Component({
  selector: 'nc-logo-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-carousel.component.html',
  styleUrl: './logo-carousel.component.css',
})
export class LogoCarouselComponent {
  @Input()
  logos!: Logo[];
}
