import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { CustomField, FormFieldDefinition, FormFieldTypes, MultiSelectField, NumberField, RadioField, SelectField } from './form-fields2.model';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SSFormController } from './ss-form-controller.service';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SSInputTextComponent } from '../ss-input-text/ss-input-text.component';
import { SSInputNumberComponent } from '../ss-input-number/ss-input-number.component';
import { SSLoaderSMComponent } from '../ss-loader-sm/ss-loader-sm.component';
import { SSInputPasswordComponent } from '../ss-input-password/ss-input-password.component';
import { SSInputCalendarComponent } from '../ss-input-calendar/ss-input-calendar.component';
import { SSInputTextareaComponent } from '../ss-input-textarea/ss-input-textarea.component';
import { SSInputEmailComponent } from '../ss-input-email/ss-input-email.component';
import { SSInputTimeComponent } from '../ss-input-time/ss-input-time.component';
import { SSInputDropselectComponent } from '../ss-input-dropselect/ss-input-dropselect.component';
import { SSInputRadioComponent } from '../ss-input-radio/ss-input-radio.component';
import { SSInputMultiselectComponent } from '../ss-input-multiselect/ss-input-multiselect.component';
import { SSInputRangeSliderComponent } from '../ss-input-range-slider/ss-input-range-slider.component';
import { SSFormBuilderGenericHostContainerComponent } from '../ss-form-builder-generic-host-container/ss-form-builder-generic-host-container.component';
import { SSErrorComponent } from '../ss-error/ss-error.component';
import { SSInputCheckboxComponent } from '../ss-input-checkbox/ss-input-checkbox.component';

@Component({
  selector: 'ss-form-builder2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SSInputTextComponent, SSInputNumberComponent, SSInputPasswordComponent, SSInputCalendarComponent, SSInputTextareaComponent, SSInputEmailComponent, SSInputTimeComponent, SSInputDropselectComponent, SSInputRadioComponent, SSInputMultiselectComponent, SSInputRangeSliderComponent, SSInputCheckboxComponent, SSFormBuilderGenericHostContainerComponent, SSLoaderSMComponent, SSErrorComponent  ],
  templateUrl: './ss-form-builder2.component.html',
  styleUrls: ['./ss-form-builder2.component.scss']
})
export class SSFormBuilder2Component implements OnInit, OnDestroy {

  @Input() formDefinition!: FormFieldDefinition[];
  @Input() formInitValue: any;
  @Input() loading: boolean = false;
  @Input() loadingObservable: Observable<boolean> = of(false);
  @Input() useVirtualKeyboard: boolean = false;

  @Output() formValueChange: EventEmitter<any> = new EventEmitter<any>();

  form!: FormGroup;

  formReady: boolean = false;

  private formBuiltSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get formBuilt(): Observable<boolean> {
    return this.formBuiltSubject.asObservable();
  }

  formFieldTypes: typeof FormFieldTypes = FormFieldTypes;

  combinedObservable: Observable<boolean>;

  constructor(
    public formController: SSFormController,
    // change detection
    private cd: ChangeDetectorRef
    ) {
      // create an instance of the FormGroup using the form definition

    }

  ngOnInit() {

    // this.formBuilt

    this.combinedObservable = combineLatest([this.loadingObservable, this.formBuilt]).pipe(
      map(([loading, formBuilt]: [boolean, boolean]) => loading || !formBuilt)
    );

    this.form = this.formController.getEmptyForm(this.formDefinition);

    this.formReady = true;

    this.formController.getFormPatchValue(this.formDefinition)
      .then(patchValues => {
        // this.form = formGroup;
        this.setFormValue(patchValues);
        console.log('formGroup with all data: ', patchValues);
        this.formBuiltSubject.next(true);

        this.form.valueChanges.subscribe((result: any) => {
          this.formValueChange.emit(result);
        });

        // update changedetection manually

        this.cd.detectChanges();

        // console.log('loading after dtcch: ', this.loading)

        // console.log('Form Definition: ', this.formDefinition)
      });
  }

  public setFormValue(newFormValues: any[]) {
    newFormValues.forEach((item) => {
      this.form.patchValue(item);
    })
  }

  isControlValid(controlName: string): boolean {
    if (!this.formBuilt) {
      return false;
    }
    const control = this.form.get(controlName);
    if (control?.valid) {
      return true
    } else {
      return false
    }
  }

  getFieldProperties(fieldName: string): any {
    const field = this.formDefinition.find(f => f.name === fieldName);
    if (field && field.type === FormFieldTypes.Number) {
      return field as NumberField;
    }
    if (field && field.type === FormFieldTypes.Select) {
      return field as SelectField;
    }
    if (field && field.type === FormFieldTypes.MultiSelect) {
      return field as MultiSelectField;
    }
    if (field && field.type === FormFieldTypes.Radio) {
      return field as RadioField;
    }
    if (field && field.type === FormFieldTypes.Custom) {
      return field as CustomField;
    }

    if (field) {
      return field as any;
    }
    return null;
  }

  ngOnDestroy(): void {
    this.formController.clearForm();
  }
}
