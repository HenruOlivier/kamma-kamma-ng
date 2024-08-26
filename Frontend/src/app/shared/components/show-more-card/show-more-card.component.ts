import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-more-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-more-card.component.html',
  styleUrl: './show-more-card.component.scss'
})
export class ShowMoreCardComponent {

  @Input() maxCardHeight: string = '200px';

  isExpanded: boolean = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

}
