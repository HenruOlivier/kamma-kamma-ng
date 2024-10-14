import { trigger, transition, style, query, stagger, animate } from '@angular/animations';

export const Loops = trigger('loops', [
    transition('* <=> *', [
        query(':enter', [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger('100ms', [
                animate('300ms ease-out', style({ opacity: 1, transform: 'none' }))
            ])
        ], { optional: true }),
        query(':leave', [
            stagger('100ms', [
                animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-15px)' }))
            ])
        ], { optional: true })
    ]),
]);
