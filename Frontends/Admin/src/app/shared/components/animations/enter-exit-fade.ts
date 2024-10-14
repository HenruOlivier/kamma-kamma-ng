import { animate, style, transition, trigger, query, stagger } from '@angular/animations';

export const EnterExitFade = trigger('enterExitFade', [
    transition(':enter', [
        style({ opacity: 0, display: 'none' }),
        animate('0ms 350ms', style({ display: 'block' })),
        animate('200ms ease-out', style({ opacity: 1 })),
    ]),
    transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, display: 'none' })),
    ]),
]);
