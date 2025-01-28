import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SSComponentsModule } from '../../../shared/components/ss-lib-components/ss-components.module';
import { SSDirectivesModule } from '../../../shared/ss-directives/ss-directives.module';
import { ActionButtonStates } from '../../../shared/ss-directives/action-button-states';
import { Subject } from 'rxjs';
import { Image } from '../../../shared/models/image.model';
import { FormFieldDefinition, FormFieldTypes } from '../../../shared/components/ss-lib-components/ss-form-builder2/form-fields2.model';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../../../shared/services/images/images.service';
import { SSFormController } from '../../../shared/components/ss-lib-components/ss-form-builder2/ss-form-controller.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { SSFormBuilder2Component } from '../../../shared/components/ss-lib-components/ss-form-builder2/ss-form-builder2.component';

@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [CommonModule, SSComponentsModule, SSDirectivesModule, SSFormBuilder2Component],
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  _id: string | null = null;
  currentImageEditable: Image | null = null;

  formDefinition: FormFieldDefinition[] = [];

  btnState = ActionButtonStates.Idle;
  btnError = ActionButtonStates.Error;
  btnText = 'Save Image';

  constructor(
    private activatedRoute: ActivatedRoute,
    public imagesService: ImagesService,
    public formController: SSFormController
  ) {
    // Define form fields according to the Image interface
    this.formDefinition = [
      { type: FormFieldTypes.Text, name: 'url', label: 'Image URL', required: true },
      { type: FormFieldTypes.Text, name: 'description', label: 'Description', required: false }
    ];
  }

  ngOnInit() {
    this._id = this.activatedRoute.snapshot.params['_id'] || null;

    if (this._id) {
      this.imagesService.fetchImageById(this._id)
        .pipe(
          tap((response: Image | null) => {
            if (response) {
              this.currentImageEditable = response;
              this.formController.setFormValue(response);
            }
          }),
          catchError((error: any) => {
            console.error('Error fetching image:', error);
            return error;
          })
        )
        .subscribe();
    }
  }

  onSave() {
    const formData: Image = this.formController.getFormValue();
    this.btnState = ActionButtonStates.Loading;

    if (this._id) {
      this.imagesService.updateImage(this._id, formData)
        .pipe(
          tap(() => {
            this.btnState = ActionButtonStates.Success;
          }),
          catchError((error: any) => {
            this.btnState = ActionButtonStates.Error;
            console.error('Error updating image:', error);
            return error;
          }),
          finalize(() => {
            this.btnState = ActionButtonStates.Idle;
          })
        )
        .subscribe();
    } else {
      this.imagesService.addImage(formData)
        .pipe(
          tap(() => {
            this.btnState = ActionButtonStates.Success;
          }),
          catchError((error: any) => {
            this.btnState = ActionButtonStates.Error;
            console.error('Error creating image:', error);
            return error;
          }),
          finalize(() => {
            this.btnState = ActionButtonStates.Idle;
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}