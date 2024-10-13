import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ss-img',
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
