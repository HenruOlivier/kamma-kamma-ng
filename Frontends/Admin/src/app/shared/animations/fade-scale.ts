import { trigger, transition, style, animate } from '@angular/animations';

export const FadeScale = trigger('fadeScale', [
    transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('0.7s ease', style({ opacity: 1, transform: 'scale(1)' })),
    ]),
    transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('0.7s ease', style({ opacity: 0, transform: 'scale(0.5)' }))
    ])
]);
