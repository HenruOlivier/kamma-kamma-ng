import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ss-list-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class SSListViewComponent {

  @Input() scrollDirection: 'horizontal' | 'vertical' = 'horizontal';

}
