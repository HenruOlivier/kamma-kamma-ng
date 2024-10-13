import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { SSEvent } from '../../../models/ss-event.model';
import { MediaEventActions, MediaEventTypes } from '../media-events.model';

@Component({
  selector: 'ss-pdf-viewer',
  templateUrl: './ss-pdf-viewer.component.html',
  styleUrl: './ss-pdf-viewer.component.scss'
})
export class SSPdfViewerComponent implements AfterViewInit, OnDestroy {

  /**
   * The source of the PDF file.
   */
  @Input() src: string = '';

  /**
   * Events emitted by the viewer.
   */
  @Output() events = new EventEmitter<SSEvent<MediaEventTypes, MediaEventActions>>();

  /**
   * Has the user finished reading the PDF.
   */
  protected hasFinished = false;

  /**
   * When did they start reading the PDF.
   */
  protected startedOn = -1;

  /**
   * The total number of pages in the PDF.
   */
  protected totalPages = 0;

  /**
   * The pages that have been viewed.
   */
  protected viewedPages = [1];

  /**
   * Angular lifecycle hook.
   */
  ngAfterViewInit(): void {
    this.startedOn = Date.now();
    const details: any = {
      started_on: this.startedOn,
    };
    this.events.emit(new SSEvent(MediaEventTypes.PDF, MediaEventActions.View, details));
  }

  /**
   * Angular lifecycle hook.
   */
  ngOnDestroy(): void {
    if (this.hasFinished) {
      return;
    }
    const finishedOn = Date.now();
    const details: any = {
      started_on: this.startedOn,
      ended_on: finishedOn,
      total_time: (finishedOn - this.startedOn) / 1000, //seconds
      percentage_viewed: (this.viewedPages.length / this.totalPages) * 100,
      total_pages: this.totalPages,
      viewed_pages: this.viewedPages,
    };
    this.events.emit(new SSEvent(MediaEventTypes.PDF, MediaEventActions.DropOff, details));
  }

  /**
   * Called when the PDF is loaded.
   *
   * @param data The PDF data.
   */
  onLoadComplete(data: any): void {
    this.totalPages = data.numPages;
  }

  /**
   * Called when the page changes.
   *
   * @param currentPage The current page number.
   */
  onPageChange(currentPage: number): void {
    if (this.viewedPages.includes(currentPage)) {
      return;
    }
    this.viewedPages.push(currentPage);
    // Only fires once when the last page is reached
    if (currentPage === this.totalPages) {
      this.hasFinished = true;
      const finishedOn = Date.now();
      const details: any = {
        started_on: this.startedOn,
        ended_on: finishedOn,
        total_time: (finishedOn - this.startedOn) / 1000, //seconds
        percentage_viewed: (this.viewedPages.length / this.totalPages) * 100,
        total_pages: this.totalPages,
        viewed_pages: this.viewedPages,
      };
      this.events.emit(new SSEvent(MediaEventTypes.PDF, MediaEventActions.Completion, details));
    }
  }

}
