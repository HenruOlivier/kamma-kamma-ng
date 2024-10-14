import { animate, style, transition, trigger, query, stagger } from '@angular/animations';

export const EnterExit = trigger('enterExit', [
    transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)', height: 0, width: 0, padding: 0, margin: 0, border: 0}),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)', height: '*', width: '*', padding: '*', margin: '*', border: '*' })),
    ]),
    transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.7)', height: 0, width: 0, padding: 0, margin: 0, border: 0 })),
    ]),
]);
