import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MediaEventTypes } from '../media-events.model';
import { BaseMediaPlayerComponent } from '../base-media-player.component';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

@Component({
  selector: 'ss-audio-player',
  templateUrl: './ss-audio-player.component.html',
  styleUrl: './ss-audio-player.component.scss'
})
export class SSAudioPlayerComponent extends BaseMediaPlayerComponent implements AfterViewInit {

  /**
   * The event type.
   */
  protected override eventType = MediaEventTypes.Audio;

  /**
   * The player instance.
   */
  protected override player: Player;

  /**
   * Access the video element.
   */
  @ViewChild('audioPlayer') audioElementRef!: ElementRef<HTMLVideoElement>;

  /**
   * Angular lifecycle hook.
   */
  override ngAfterViewInit(): void {
    this.player = videojs(this.audioElementRef.nativeElement, this.options);
    super.ngAfterViewInit();
  }

}
