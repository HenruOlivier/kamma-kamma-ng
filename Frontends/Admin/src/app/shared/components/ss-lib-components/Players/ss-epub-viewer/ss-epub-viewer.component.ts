import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, NavItem } from 'epubjs';
import Navigation from 'epubjs/types/navigation';
import 'hammerjs';
import { saveAs } from 'file-saver';
import { take } from 'rxjs';
import { TOCItem } from './toc-item.interface';
import { Section } from './section.interface';
import { MediaEventActions, MediaEventTypes } from '../media-events.model';
import { SSEvent } from '../../../models/ss-event.model';

@Component({
  selector: 'ss-epub-viewer',
  templateUrl: './ss-epub-viewer.component.html',
  styleUrl: './ss-epub-viewer.component.scss'
})
export class SSEpubViewerComponent implements OnInit, OnDestroy {

  /**
  * The filename for the given file when downloaded
  */
  @Input() downloadFileName = 'download.epub';

  /**
   * Events emitted by the viewer.
   */
  @Output() events = new EventEmitter<SSEvent<MediaEventTypes, MediaEventActions>>();

  /**
   * The preferred starting font size in percentage.
   */
  @Input() fontSize = 100;

  /**
   * Our we working with a Right to Left language
   */
  @Input() isRTL = false;

  /**
   * The minimum font size in percentage.
   */
  @Input() minimumFontSize = 30;

  /**
   * Do you want to show the toolbar?
   */
  @Input() showToolbar = true;

  /**
   * The source of the epub we want to display
   */
  @Input() src = '';

  /**
   * Are we at the end of the book
   */
  isAtEnd = false;

  /**
   * Are we at the start of the book
   */
  isAtStart = true;

  /**
   * Are we isDownloading the pdf
   */
  isDownloading = false;

  /**
   * Is the toc panel open
   */
  isPanelOpen = false;

  /**
   * The rendition of the book
   */
  rendition: any = null;

  /**
   * The table of contents
   */
  toc: Array<TOCItem> = [];

  /**
   * Has the user finished reading the EPUB.
   */
  protected hasFinished = false;

  /**
   * The sections that have been viewed.
   */
  protected sectionsViewed: Section[] = [];

  /**
   * When did they start reading the EPUB.
   */
  protected startedOn = -1;

  /**
   * The total number of sections in the EPUB.
   */
  protected totalSections = 0;

  /**
   * Build the component
   *
   * @param http The HTTP service
   */
  constructor(
    private changeDetector: ChangeDetectorRef,
    private http: HttpClient,
    private zone: NgZone,
  ) { }

  /**
   * Angular lifecycle hook.
   */
  ngOnInit(): void {
    if (this.fontSize < this.minimumFontSize) {
      // Minimum font size
      this.fontSize = this.minimumFontSize;
    }
    this.startedOn = Date.now();
    const details: any = {
      started_on: this.startedOn,
    };
    this.events.emit(new SSEvent(MediaEventTypes.EPUB, MediaEventActions.View, details));
    this.loadFile();
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
      percentage_viewed: this.calculatePercentageViewed(),
      total_pages: this.calculatePagesViewed(),
      // currently it is empty because it will be too large of an array
      viewed_pages: [],
    };
    this.events.emit(new SSEvent(MediaEventTypes.EPUB, MediaEventActions.DropOff, details));
  }

  /**
     * Change the page on swipe
     *
     * @param  swipeDirection   The direction you want to go towards (left|right)
     */
  changePage(swipeDirection: string): void {
    if ((swipeDirection === 'left') && (!this.isRTL)) {
      this.next();
      return;
    }
    if ((swipeDirection === 'right') && (!this.isRTL)) {
      this.prev();
      return;
    }
    if ((swipeDirection === 'left') && (this.isRTL)) {
      this.prev();
      return;
    }
    if ((swipeDirection === 'right') && (this.isRTL)) {
      this.next();
      return;
    }
  }

  /**
   * Close the Table of Contents modal
   */
  closeTOC(): void {
    this.isPanelOpen = false;
    /**
     * We need to scroll to the top of the container when the TOC is closed.
     */
    const containers = document.querySelectorAll('.dialog-content-container');
    for (let i = 0; i < containers.length; i++) {
      const toc = containers[i].querySelector('#table-of-contents');
      const wrapper = containers[i].querySelector('#viewer-wrapper');
      if (toc && !wrapper) {
        containers[i].scrollTop = 0;
        break;
      }
    }
  }

  /**
     * Decrease the font size
     *
     * @return void
     */
  decreaseFont(): void {
    if (this.fontSize <= this.minimumFontSize) {
      return;
    }
    this.fontSize -= 10;
    this.rendition.themes.fontSize(`${this.fontSize}%`);
    this.updateDetails();
  }

  /**
   * Download the given file
   *
   * @returns void
   */
  download(): void {
    if (this.src === '') {
      return;
    }
    this.isDownloading = true;
    this.http.get(this.src, { responseType: 'blob' }).pipe(take(1)).subscribe((response: any) => {
      this.zone.run(() => {
        this.isDownloading = false;
        this.changeDetector.detectChanges();
      });
      const fileBlob = new Blob([response], { type: "application/epub+zip" });
      saveAs(fileBlob, this.downloadFileName);
    });
  }

  /**
   * Increase the font size
   *
   * @return void
   */
  increaseFont(): void {
    this.fontSize += 10;
    this.rendition.themes.fontSize(`${this.fontSize}%`);
    this.updateDetails();
  }

  /**
   * Open the Table of Contents modal
   */
  openTOC(): void {
    this.isPanelOpen = true;
  }

  /**
   * Open the Table of Contents item
   *
   * @param item The requested item
   */
  openTOCItem(item: TOCItem): void {
    this.closeTOC();
    this.rendition.display(item.ref);
    this.updateDetails();
  }

  /**
   * Go to the next page.
   *
   * @return void
   */
  next(): void {
    this.rendition.next();
    this.updateDetails();
  }

  /**
   * Go to the previous page.
   *
   * @return void
   */
  prev(): void {
    this.rendition.prev();
    this.updateDetails();
  }

  /**
   * Calculate the number of pages viewed
   *
   * @returns The number of pages viewed
   */
  protected calculatePagesViewed(): number {
    return this.sectionsViewed.reduce((total: number, section: Section) => {
      return total + section.viewedPages.length;
    }, 0);
  }

  /**
   * Calculate the percentage of the book that has been viewed
   *
   * @returns The percentage of the book that has been viewed
   */
  protected calculatePercentageViewed(): number {
    // Get a even percentage for each section of the book
    let sectionBaseScore = 100;
    if (this.totalSections > 0) {
      sectionBaseScore = 100 / this.totalSections;
    }
    // For each section viewed, calculate the percentage of that section viewed
    return this.sectionsViewed.reduce((total: number, section: Section) => {
      return total + (section.viewedPages.length / section.totalPages) * sectionBaseScore;
    }, 0);
  }

  /**
   * A convience method for flatten our toc array
   *
   * @param  items  The array to flatten
   * @return        The new array
   */
  protected flatten(items: NavItem[]): NavItem[] {
    const current: NavItem[][] = items.map((v: NavItem) => {
      if (!v.subitems) {
        return [];
      }
      return [v, ...this.flatten(v.subitems)];
    });
    return ([] as NavItem[]).concat(...current);
  }

  /**
   * Load the epub file
   */
  protected loadFile(): void {
    if (this.src === '') {
      return;
    }
    const book = new Book(this.patchEpubSource(this.src));
    book.ready.then(() => {
      setTimeout(() => {
        // We need to add a delay, otherwise images on first page do not load
        this.rendition = book.renderTo('book', { width: '100%', height: '100%' });
        this.rendition.themes.fontSize(`${this.fontSize}%`);
        this.rendition.display();
        this.updateDetails();
        this.totalSections = this.rendition.book.spine.items.length;
      }, 200);
      book.loaded.navigation.then((toc: Navigation) => {
        this.toc = this.flatten(toc.toc).map((item: NavItem) => {
          const TOCItem: TOCItem = {
            id: String(item.id),
            label: String(item.label).replace(/(\r\n|\n|\r)/gm, '').trim(),
            ref: String(item.href),
          };
          return TOCItem;
        });
      });
    }).catch((error: any) => {
      console.error('Error loading book', error);
    });
  }

  /**
   * For the epubjs library, we need to patch the URL to include the .epub extension.
   * Otherwise, the library will not load the file and throw a 404 error looking for
   * http://localhost:3007/api/v3/cdn/stream/media/META-INF/container.xml. YIKES!
   *
   * @param source The source of the epub file
   *
   * @returns The patched URL
   */
  protected patchEpubSource(source: string): string {
    if (source.includes('.epub')) {
      return source;
    }
    const url = new URL(source);
    const pathSegments = url.pathname.split('/');
    pathSegments[pathSegments.length - 1] += '.epub';
    url.pathname = pathSegments.join('/');
    return url.toString();
  }

  /**
  * Update the details of the provide ebook.
  */
  protected updateDetails(): void {
    if (!this.rendition) {
      return;
    }
    // We need to add a delay, otherwise the location is not updated
    setTimeout(() => {
      const location = this.rendition.currentLocation();
      // Set these variables so we can use them in the template
      this.isAtEnd = (location && location.atEnd) ? true : false;
      this.isAtStart = (location && location.atStart) ? true : false;

      const firstPageDetails = location.start;
      // This will be the same as the first if we are on mobile
      const secondPageDetails = location.end;

      // Add the section to the sections viewed
      let section: Section | undefined = this.sectionsViewed.find((section: Section) => section.index === secondPageDetails.index);
      if (!section) {
        section = {
          index: secondPageDetails.index,
          lastPage: secondPageDetails.displayed.page,
          totalPages: secondPageDetails.displayed.total,
          viewedPages: [],
        };
        this.sectionsViewed.push(section);
      } else if (section.lastPage < secondPageDetails.displayed.page) {
        section.lastPage = secondPageDetails.displayed.page;
      }

      if (!section.viewedPages.includes(firstPageDetails.displayed.page)) {
        // We are on mobile
        section.viewedPages.push(firstPageDetails.displayed.page);
      }
      if ((firstPageDetails.displayed.page !== secondPageDetails.displayed.page) && (!section.viewedPages.includes(secondPageDetails.displayed.page))) {
        // We are on desktop
        section.viewedPages.push(secondPageDetails.displayed.page);
      }

      if ((!this.hasFinished) && (this.isAtEnd)) {
        this.hasFinished = true;
        const finishedOn = Date.now();
        const details: any = {
          started_on: this.startedOn,
          ended_on: finishedOn,
          total_time: (finishedOn - this.startedOn) / 1000, //seconds
          percentage_viewed: this.calculatePercentageViewed(),
          total_pages: this.calculatePagesViewed(),
          // currently it is empty because it will be too large of an array
          viewed_pages: [],
        };
        this.events.emit(new SSEvent(MediaEventTypes.EPUB, MediaEventActions.Completion, details));
      }
    }, 200);
  }

}
