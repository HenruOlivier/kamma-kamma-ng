import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { PdfViewerModule } from 'ng2-pdf-viewer';

import { SSPipesModule } from '../../ss-pipes/ss-pipes.module';

import { SSDataGridComponent } from './ss-data-grid/ss-data-grid.component';
//import { SSConfirmationDialogComponent } from './ss-confirm-dialog/ss-confirmation-dialog.component';
import { SSLoaderSMComponent } from './ss-loader-sm/ss-loader-sm.component';
import { SSChipListComponent } from './ss-chip-list/ss-chip-list.component';
import { SSInputSearchComponent } from './ss-input-search/ss-input-search.component';
import { SSInputTimeComponent } from './ss-input-time/ss-input-time.component';
import { SSInputTextComponent } from './ss-input-text/ss-input-text.component';
import { SSInputRadioComponent } from './ss-input-radio/ss-input-radio.component';
import { SSInputPasswordComponent } from './ss-input-password/ss-input-password.component';
import { SSInputNumberComponent } from './ss-input-number/ss-input-number.component';
import { SSInputMultiselectComponent } from './ss-input-multiselect/ss-input-multiselect.component';
import { SSInputEmailComponent } from './ss-input-email/ss-input-email.component';
import { SSInputDropselectComponent } from './ss-input-dropselect/ss-input-dropselect.component';
import { SSFormBuilderGenericHostContainerComponent } from './ss-form-builder-generic-host-container/ss-form-builder-generic-host-container.component';
import { SSInputCalendarComponent } from './ss-input-calendar/ss-input-calendar.component';
import { SSInputCheckboxComponent } from './ss-input-checkbox/ss-input-checkbox.component';
import { SSInputRangeSliderComponent } from './ss-input-range-slider/ss-input-range-slider.component';
import { SSSkeletonLoaderComponent } from './ss-skeleton-loader/ss-skeleton-loader.component';
import { SSImgComponent } from './ss-img/ss-img.component';
import { SSInputTextButtonComponent } from './ss-input-text-button/ss-input-text-button.component';
import { SSInputTextareaComponent } from './ss-input-textarea/ss-input-textarea.component';
import { SSFormBuilder2Component } from './ss-form-builder2/ss-form-builder2.component';
import { SSChunkUploaderComponent } from './ss-chunk-uploader/ss-chunk-uploader.component';
import { SSErrorComponent } from './ss-error/ss-error.component';
import { SSStepperComponent } from './ss-stepper/ss-stepper.component';
import { SSDialogComponent } from './ss-dialog/ss-dialog.component';
import { SsVirtualKeyboardComponent } from './test/ss-virtual-keyboard/ss-virtual-keyboard.component';
import { KeyboardDraggerComponent } from './test/keyboard-dragger/keyboard-dragger.component';
import { DraggableDirective } from './test/draggable.directive';
import { VirtualKeyboardDirective } from './test/virtual-keyboard.directive';
import { SSProgressBarComponent } from './ss-progress-bar/ss-progress-bar.component';
import { SSListViewComponent } from './ss-list-view/list-view.component';
// import { SSAudioPlayerComponent } from './Players/ss-audio-player/ss-audio-player.component';
// import { SSEpubViewerComponent } from './Players/ss-epub-viewer/ss-epub-viewer.component';
// import { SSImgViewerComponent } from './Players/ss-img-viewer/ss-img-viewer.component';
// import { SSPdfViewerComponent } from './Players/ss-pdf-viewer/ss-pdf-viewer.component';
// import { SSVideoPlayerComponent } from './Players/ss-video-player/ss-video-player.component';

@NgModule({
  declarations: [
    SSDataGridComponent,
    //SSConfirmationDialogComponent,
    SSDialogComponent,
    SSLoaderSMComponent,
    SSChipListComponent,
    SSInputSearchComponent,
    SSInputTimeComponent,
    SSInputTextComponent,
    SSInputRadioComponent,
    SSInputPasswordComponent,
    SSInputNumberComponent,
    SSInputMultiselectComponent,
    SSInputEmailComponent,
    SSInputDropselectComponent,
    SSInputCalendarComponent,
    SSFormBuilderGenericHostContainerComponent,
    SSInputCheckboxComponent,
    SSInputRangeSliderComponent,
    SSSkeletonLoaderComponent,
    SSImgComponent,
    SSInputTextButtonComponent,
    SSInputTextareaComponent,
    SSFormBuilder2Component,
    SSChunkUploaderComponent,
    SSErrorComponent,
    SSStepperComponent,
    SSListViewComponent,
    //Players
    // SSAudioPlayerComponent,
    // SSEpubViewerComponent,
    // SSImgViewerComponent,
    // SSPdfViewerComponent,
    // SSVideoPlayerComponent,

    SsVirtualKeyboardComponent,
    KeyboardDraggerComponent,
    DraggableDirective,
    VirtualKeyboardDirective,
    SSProgressBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // PdfViewerModule,

    SSPipesModule,
  ],
  exports: [
    SSDataGridComponent,
    //SSConfirmationDialogComponent,
    SSDialogComponent,
    SSLoaderSMComponent,
    SSChipListComponent,
    SSInputSearchComponent,
    SSInputTimeComponent,
    SSInputTextComponent,
    SSInputRadioComponent,
    SSInputPasswordComponent,
    SSInputNumberComponent,
    SSInputMultiselectComponent,
    SSInputEmailComponent,
    SSInputDropselectComponent,
    SSInputCalendarComponent,
    SSInputCheckboxComponent,
    SSInputRangeSliderComponent,
    SSInputTextButtonComponent,
    SSInputTextareaComponent,
    SSSkeletonLoaderComponent,
    SSImgComponent,
    SSChunkUploaderComponent,
    SSFormBuilderGenericHostContainerComponent,
    SSFormBuilder2Component,
    SSErrorComponent,
    SSStepperComponent,
    SSProgressBarComponent,
    SSListViewComponent,
    //Players
    // SSAudioPlayerComponent,
    // SSEpubViewerComponent,
    // SSImgViewerComponent,
    // SSPdfViewerComponent,
    // SSVideoPlayerComponent,



    // SsVirtualKeyboardComponent,
    // KeyboardDraggerComponent,
    // DraggableDirective,
    VirtualKeyboardDirective,


  ]
})
export class SSComponentsModule { }
