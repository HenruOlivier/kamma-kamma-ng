import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import Player from 'video.js/dist/types/player';
import { SSEvent } from '../../models/ss-event.model';
import { MediaPlayerOptions } from './media-player-options.interface';
import { MediaEventActions, MediaEventTypes } from './media-events.model';

/**
 * This is a parent component for all components that use videojs.
 * It handles all common functionality including event firing and tracking.
 * NOTE: If the child implements AfterViewInit and OnDestroy, it should call 
 * super.ngAfterViewInit() and super.ngOnDestroy() accordionly.
 */
@Component({
  template: '', // This is not meant to be used directly
})
export abstract class BaseMediaPlayerComponent implements AfterViewInit, OnDestroy {

  /**
   * The options for the video player.
   */
  @Input() options: MediaPlayerOptions = {
    sources: [],
  };

  /**
   * Emits events when the video is played.
   */
  @Output() events = new EventEmitter<SSEvent<MediaEventTypes, MediaEventActions>>();

  /**
   * The event type for the player.
   */
  protected abstract eventType: MediaEventTypes;

  /**
   * Whether the video has ended.
   */
  protected hasEnded = false;

  /**
   * The player instance.
   */
  protected abstract player: Player;

  /**
   * The previous time the video was played.
   */
  protected previousTime = 0;

  /**
   * The time the video started playing.
   */
  protected startedOn = -1;

  /**
   * The total time the video has been watched.
   */
  protected totalTimeWatched = 0;

  /**
   * Angular lifecycle hook.
   */
  ngAfterViewInit(): void {
    this.player.on('play', this.onPlayEvent.bind(this));
    this.player.on('ended', this.onEndedEvent.bind(this));
    this.player.on('timeupdate', this.onTimeUpdateEvent.bind(this));
    this.player.on('seeked', this.onSeekedEvent.bind(this));
  }

  /**
   * Angular lifecycle hook.
   */
  ngOnDestroy(): void {
    this.player.dispose();
    if (!this.hasEnded) {
      /**
       * Send event that the player has been viewed.
       */
      const details = {
        started_on: this.startedOn,
        finished_on: Date.now(),
        total_time: this.totalTimeWatched, // seconds
        percentage_viewed: this.calculateWatchedPercentage(),
      };
      this.events.emit(new SSEvent(this.eventType, MediaEventActions.DropOff, details));
    }
  }

  /**
   * Calculate the percentage of the video watched.
   *
   * @returns The percentage of the video watched.
   */
  protected calculateWatchedPercentage(): number {
    const duration = this.player.duration() || 0;
    if (duration === 0) {
      return 0;
    }
    return (this.totalTimeWatched / duration) * 100;
  }

  /**
   * Fired when the video ended event is triggered.
   */
  protected onEndedEvent(): void {
    this.hasEnded = true;
    /**
     * Send event that the video has been viewed.
     */
    const details = {
      started_on: this.startedOn,
      finished_on: Date.now(),
      total_time: this.totalTimeWatched, // seconds
      percentage_viewed: this.calculateWatchedPercentage(),
    };
    this.events.emit(new SSEvent(this.eventType, MediaEventActions.Completion, details));
  }

  /**
   * Fired when the video play event is triggered.
   */
  protected onPlayEvent(): void {
    if (this.startedOn === -1) {
      this.startedOn = Date.now();
      const details = {
        started_on: this.startedOn,
      };
      this.events.emit(new SSEvent(this.eventType, MediaEventActions.View, details));
    }
    this.previousTime = this.player.currentTime() || 0;
  }

  /**
   * Fired when the video seeked event is triggered.
   */
  protected onSeekedEvent(): void {
    this.previousTime = this.player.currentTime() || 0;
  }

  /**
   * Fired when the video time is updated.
   */
  protected onTimeUpdateEvent(): void {
    const currentTime = this.player.currentTime();
    if ((!this.player.paused()) && (currentTime)) {
      const elapsedTime = currentTime - this.previousTime;
      if (elapsedTime > 0) {
        this.totalTimeWatched += elapsedTime;
      }
      this.previousTime = currentTime;
    }
  }

}
