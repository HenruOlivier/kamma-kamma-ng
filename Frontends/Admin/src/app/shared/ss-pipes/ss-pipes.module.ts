import { NgModule } from '@angular/core';

import { DateAgoPipe } from './date-ago.pipe';
import { FileSizePipe } from './file-size.pipe';

@NgModule({
    declarations: [
        DateAgoPipe,
        FileSizePipe
    ],
    imports: [
    ],
    exports: [
        DateAgoPipe,
        FileSizePipe
    ]
})
export class SSPipesModule { }
