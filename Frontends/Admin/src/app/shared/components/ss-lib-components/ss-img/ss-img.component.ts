import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { SSSkeletonLoaderComponent } from '../ss-skeleton-loader/ss-skeleton-loader.component';

@Component({
  selector: 'ss-img',
  standalone: true,
  imports: [CommonModule, SSSkeletonLoaderComponent],
  templateUrl: './ss-img.component.html',
  styleUrls: ['./ss-img.component.scss']
})
export class SSImgComponent {

  @Input() src: string = '';
  @Input() imgStyles: { [key: string]: any } = {};
  @Input() loaderStyles: { [key: string]: any } = {};
  @Input() errorStyles: { [key: string]: any } = {};

  isLoading: boolean = true;
  hasError: boolean = false;
  validImgSrc: boolean = false;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      this.validImgSrc = true;
    }
  }

  onLoad() {
    this.isLoading = false;
  }

  onError() {
    this.isLoading = false;
    this.hasError = true;
  }

}
