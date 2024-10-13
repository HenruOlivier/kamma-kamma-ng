import { NgModule } from '@angular/core';

import { ActionButtonDirective } from './action-button.directive';
import { PressAndHoldDirective } from './press-hold.directive';

@NgModule({
    declarations: [
        ActionButtonDirective,
        PressAndHoldDirective
    ],
    imports: [
    ],
    exports: [
        ActionButtonDirective,
        PressAndHoldDirective
    ]
})
export class SSDirectivesModule { }
