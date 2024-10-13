import { Component, Input } from '@angular/core';

@Component({
  selector: 'ss-skeleton-loader',
  templateUrl: './ss-skeleton-loader.component.html',
  styleUrls: ['./ss-skeleton-loader.component.scss']
})
export class SSSkeletonLoaderComponent {
  @Input() width = '100%';
  @Input() height = '100%';

}
