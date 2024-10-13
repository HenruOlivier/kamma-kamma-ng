/**
 * Interface for the video player options
 */
export interface MediaPlayerOptions {
  fluid?: boolean;
  aspectRatio?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  preload?: 'auto' | 'metadata' | 'none';
  sources: {
    src: string;
    type: string;
  }[];
}
