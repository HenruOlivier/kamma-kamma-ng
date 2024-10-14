import { trigger, state, style, animate, transition } from '@angular/animations';

export const Expand = trigger('expand', [
    state('void', style({ height: '0', opacity: 0 })),
    transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('250ms ease-out', style({ height: '*', opacity: 1 })),
    ]),
    transition(':leave', [
        animate('250ms ease-in', style({ height: '0', opacity: 0 })),
    ]),
]);
