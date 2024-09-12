import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performance-image',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './performance-image.component.html',
  styleUrls: ['./performance-image.component.css']
})
export class PerformanceImageComponent implements OnInit {

  @Input() src!: string;
  @Input() alt: string = '';
  @Input() title: string = '';
  @Input() fullScreen: boolean = false;
  @Input() slowGrow: boolean = false;
  @Input() useBlurredImage: boolean = false;
  @Input() useLoadingImage: boolean = false;
  @Input() useSkeleton: boolean = false;
  @Input() fadeRight: boolean = false;
  @Input() fullImage: boolean = false;
  @Output() loaded: EventEmitter<void> = new EventEmitter();

  imageLoaded = false;

  ngOnInit() {
    const img = new Image();
    img.src = this.src;
    img.onload = () => {
      this.imageLoaded = true;
      this.loaded.emit();
    };
  }

  changetoLoaded() {
    this.imageLoaded = !this.imageLoaded;
  }

}
