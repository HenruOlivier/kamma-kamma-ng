import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BaseMediaPlayerComponent } from '../base-media-player.component';
import { MediaEventTypes } from '../media-events.model';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

@Component({
  selector: 'ss-video-player',
  standalone: true,
  templateUrl: './ss-video-player.component.html',
  styleUrl: './ss-video-player.component.scss'
})
export class SSVideoPlayerComponent extends BaseMediaPlayerComponent implements AfterViewInit {

  /**
   * The event type.
   */
  protected override eventType = MediaEventTypes.Video;

  /**
   * The player instance.
   */
  protected override player: Player;

  /**
   * Access the video element.
   */
  @ViewChild('videoPlayer') videoElementRef!: ElementRef<HTMLVideoElement>;

  /**
   * Angular lifecycle hook.
   */
  override ngAfterViewInit(): void {
    this.player = videojs(this.videoElementRef.nativeElement, this.options);
    super.ngAfterViewInit();
  }
}
