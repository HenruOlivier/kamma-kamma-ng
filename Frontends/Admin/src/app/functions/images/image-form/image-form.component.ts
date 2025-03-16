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
import { PerformanceImageComponent } from '../../../shared/components/performance-image/performance-image.component';
import { SSHTTPResponse } from '../../../shared/models/ss-http.model';

@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [CommonModule, SSComponentsModule, SSDirectivesModule, SSFormBuilder2Component, PerformanceImageComponent],
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

  myfile!: File | null;

  imageFilePreview!: string | null;

  imageHost: string = '';

  imagePreview!: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public imagesService: ImagesService,
    public formController: SSFormController
  ) {
    // Define form fields according to the Image interface
    this.formDefinition = [
      { type: FormFieldTypes.Text, name: 'name', label: 'Name', required: true },
      { type: FormFieldTypes.Text, name: 'description', label: 'Description', required: false }
    ];
  }

  ngOnInit() {
    this._id = this.activatedRoute.snapshot.params['_id'] || null;

    if (this._id) {
      this.imagesService.fetchImageById(this._id)
        .pipe(
          tap((response: SSHTTPResponse<Image>) => {
            if (response && response.data) {
              this.currentImageEditable = response.data;
              this.formController.setFormValue(response.data);
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

  onImagePicked(event: Event){
    this.myfile = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageFilePreview = reader.result as string;
    }
    reader.readAsDataURL(this.myfile);
  }

  onSave() {
    const formValues = this.formController.getFormValue();
    
    if (!this.myfile) {
      console.error("No file selected.");
      return;
    }
  
    this.btnState = ActionButtonStates.Loading;
  
    if (this._id) {
      // If updating an existing image
      this.imagesService.updateImage(this._id, {
        ...formValues,
        image: this.currentImageEditable?.image || this.myfile,
        imagePath: this.currentImageEditable?.url || '',
      })
      .pipe(
        tap(() => { this.btnState = ActionButtonStates.Success; }),
        catchError((error: any) => {
          this.btnState = ActionButtonStates.Error;
          console.error('Error updating image:', error);
          return error;
        }),
        finalize(() => { this.btnState = ActionButtonStates.Idle; })
      )
      .subscribe();
    } else {
      // If adding a new image
      this.imagesService.addImage(this.myfile, formValues.name, formValues.description)
      .pipe(
        tap(() => { this.btnState = ActionButtonStates.Success; }),
        catchError((error: any) => {
          this.btnState = ActionButtonStates.Error;
          console.error('Error creating image:', error);
          return error;
        }),
        finalize(() => { this.btnState = ActionButtonStates.Idle; })
      )
      .subscribe();
    }
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}