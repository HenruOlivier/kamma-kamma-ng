import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { SSEvent } from '../../../models/ss-event.model';
import { MediaEventActions, MediaEventTypes } from '../media-events.model';

@Component({
  selector: 'ss-img-viewer',
  standalone: true,
  templateUrl: './ss-img-viewer.component.html',
  styleUrl: './ss-img-viewer.component.scss'
})
export class SSImgViewerComponent {

  @Input() src: string = '';
  @Input() imgStyles: { [key: string]: any } = {};
  @Input() loaderStyles: { [key: string]: any } = {};
  @Input() errorStyles: { [key: string]: any } = {};

  @Output() events = new EventEmitter<SSEvent<MediaEventTypes, MediaEventActions>>();

  isLoading: boolean = true;
  hasError: boolean = false;
  validImgSrc: boolean = false;
  private viewingStartTime: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      this.validImgSrc = true;
      this.resetLoadingState();
      if (this.viewingStartTime !== null) {
        this.emitFinalViewTime();
      }
    }
  }

  onLoad() {
    this.isLoading = false;

    const eventDetail = null;
    this.events.emit(new SSEvent(MediaEventTypes.Image, MediaEventActions.View, eventDetail));

    this.startViewingTimeTracker();
  }

  onError() {
    this.isLoading = false;
    this.hasError = true;
    this.stopViewingTimeTracker();
  }

  ngOnDestroy() {
    this.emitFinalViewTime();
    this.stopViewingTimeTracker();
  }

  private startViewingTimeTracker() {
    this.viewingStartTime = Date.now();
  }

  private emitFinalViewTime() {
    if (this.viewingStartTime !== null) {
      const totalViewTime = Date.now() - this.viewingStartTime;

      const eventDetail = { time: totalViewTime };
      this.events.emit(new SSEvent(MediaEventTypes.Image, MediaEventActions.Engage, eventDetail));

      this.viewingStartTime = null;
    }
  }

  private stopViewingTimeTracker() {
    this.viewingStartTime = null;
  }

  private resetLoadingState() {
    this.isLoading = true;
    this.hasError = false;
  }

}
