import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ss-progress-bar',
  standalone: true,
  templateUrl: './ss-progress-bar.component.html',
  styleUrl: './ss-progress-bar.component.scss'
})
export class SSProgressBarComponent {

  @Input() percentage: number | null = null;
  @Input() current: number | null = 20;
  @Input() total: number | null = 100;

  progress: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.percentage !== null) {
      this.progress = this.percentage;
    } else if (this.current !== null && this.total !== null && this.total !== 0) {
      this.progress = (this.current / this.total) * 100;
    }
  }

}
