import { Injectable, Injector } from '@angular/core';
import { AsyncData, FormFieldDefinition, FormFieldTypes, NumberField } from './form-fields2.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SSFormController {

  private form: FormGroup = new FormGroup({});
  private formValue: any = null;
  private formReady: boolean = false;
  private pendingFormValueUpdates: any[] = [];
  private formValidReady: boolean = false;
  private dataErrorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get dataError(): Observable<boolean> {
    return this.dataErrorSubject.asObservable();
  }

  constructor(private injector: Injector) { }

  //Publics
  public isFormValid(): boolean {
    if (this.formReady && this.formValidReady) {
      if (this.form.valid) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public getCurrentForm(): FormGroup {
    return this.form;
  }

  public setFormDisabled() {
    this.form.disable();
  }

  public setFormEnabled() {
    this.form.enable();
  }

  public setFormControlDisabled(formControlName: string): void {
    const control = this.form.get(formControlName);
    if (control) {
      control.disable();
    } else {
      console.warn(`FormControl '${formControlName}' not found.`);
    }
  }
  
  public setFormControlEnabled(formControlName: string): void {
    const control = this.form.get(formControlName);
    if (control) {
      control.enable();
    } else {
      console.warn(`FormControl '${formControlName}' not found.`);
    }
  }
  
  public getFormValue() {
    return this.form ? this.form.value : null;
  }

  public setFormValue(newFormValue: any) {
    if (this.formReady) {
      const validFormValues = Object.keys(this.form.controls)
        .reduce((obj: any, key) => {
          if (newFormValue.hasOwnProperty(key)) {
            obj[key] = newFormValue[key];
          }
          return obj;
        }, {});

      this.form.patchValue(validFormValues);
      this.formValue = this.form.value;
    } else {
      this.pendingFormValueUpdates.push(newFormValue);
    }
  }

  public getEmptyForm(formDefinition: FormFieldDefinition[]): FormGroup {
    this.form = new FormGroup({});

    for (const field of formDefinition) {

      let newFormControl: FormControl;

      if (this.formValue && this.formValue[field.name]) {
        newFormControl = new FormControl(this.formValue[field.name]);
      } else {
        newFormControl = new FormControl();
      }

      const validators = [];
      if (field.type === FormFieldTypes.Number) {

        const numberField = field as NumberField;

        if (numberField.min !== undefined) {
          validators.push(Validators.min(numberField.min));
        }
        if (numberField.max !== undefined) {
          validators.push(Validators.max(numberField.max));
        }

      }
      //Check for email validators
      if (field.type === FormFieldTypes.Email) {

        validators.push(Validators.email);

      }

      if (field.required === true) {

        validators.push(Validators.required);

      }

      //Finally apply the computed validators to the control
      newFormControl.setValidators(validators);

      //Add control into the group
      this.form.addControl(field.name, newFormControl);

    }

    console.log('Empty Form: ', this.form);

    return this.form;
   
  }

  // this function should return a promise that resolves to the necessary data to do a patchValue on the form
  // public async getFormPatchValue(formDefinition: FormFieldDefinition[]): Promise<any[]> {

  //   try {

  //     const asyncDataPromises: Promise<void>[] = [];

  //     for (const field of formDefinition) {
  //       //Finally we will resolve all the datasets that need to be fetched
  //       if ('dataset' in field) {
  //         asyncDataPromises.push(this.resolveDataset(field));
  //       }
  //     }

  //     await Promise.all(asyncDataPromises);

  //     this.formReady = true;

  //     let patchData: any[] = [];

  //     this.pendingFormValueUpdates.forEach(values => {
  //       this.setFormValue(values);

  //       const validFormValues = Object.keys(this.form.controls)
  //         .reduce((obj: any, key) => {
  //           if (values.hasOwnProperty(key)) {
  //             obj[key] = values[key];
  //           }
  //           return obj;
  //         }, {});

  //       patchData.push(validFormValues);

  //     });
  //     this.pendingFormValueUpdates = [];

  //     setTimeout(() => {
  //       this.formValidReady = true;
  //     }, 1);

  //     return patchData;

  //   } catch (error) {
  //     this.dataErrorSubject.next(true);
  //     console.error('Error in getFormPatchValue: ', error);
  //     return [];
  //   }
  // }

  public async getFormPatchValue(formDefinition: FormFieldDefinition[]): Promise<any[]> {
    try {
      const asyncDataPromises: Promise<void>[] = [];
  
      for (const field of formDefinition) {
        // Finally we will resolve all the datasets that need to be fetched
        if ('dataset' in field) {
          asyncDataPromises.push(this.resolveDataset(field));
        }
      }
  
      const results = await Promise.all(asyncDataPromises);
      
      this.formReady = true;
  
      let patchData: any[] = [];
  
      this.pendingFormValueUpdates.forEach(values => {
        this.setFormValue(values);
  
        const validFormValues = Object.keys(this.form.controls)
          .reduce((obj: any, key) => {
            if (values.hasOwnProperty(key)) {
              obj[key] = values[key];
            }
            return obj;
          }, {});
  
        patchData.push(validFormValues);
      });
      this.pendingFormValueUpdates = [];
  
      setTimeout(() => {
        this.formValidReady = true;
      }, 1);
  
      return patchData;
  
    } catch (error) {
      this.dataErrorSubject.next(true);
      console.error('Error in getFormPatchValue catch block: ', error);
      return [];
    }
  }  

  public clearForm() {
    this.formValue = null;
    this.formReady = false;
    this.formValidReady = false;
  }

  // private async resolveDataset(field: any): Promise<void> {
  //   try {
  //     let data;
  //     if (Array.isArray(field.dataset)) {
  //       // Already in the correct format
  //       data = field.dataset;
  //     } else if (this.isPromise(field.dataset)) {
  //       data = await field.dataset;
  //     } else if (this.isObservable(field.dataset)) {
  //       data = await field.dataset.pipe(first()).toPromise();
  //     } else if (this.isAsyncData(field.dataset)) {
  //       const service = this.injector.get<any>(field.dataset.service);
  //       data = await service[field.dataset.method](...field.dataset.args).toPromise();
  //     }

  //     if (data.data) {
  //       field.dataset = data.data;
  //     } else {
  //       field.dataset = data;
  //     }
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // }

  private async resolveDataset(field: any): Promise<void> {
    try {
      let data;
      if (Array.isArray(field.dataset)) {
        // Already in the correct format
        data = field.dataset;
      } else if (this.isPromise(field.dataset)) {
        data = await field.dataset;
      } else if (this.isObservable(field.dataset)) {
        data = await field.dataset.pipe(first()).toPromise();
      } else if (this.isAsyncData(field.dataset)) {
        const service = this.injector.get<any>(field.dataset.service);
        data = await service[field.dataset.method](...field.dataset.args).toPromise();
      }
    
      if (data.data) {
        field.dataset = data.data;
      } else {
        field.dataset = data;
      }
      
      return Promise.resolve();
    } catch (error) {
      console.error(`Error resolving dataset for field ${field.name}:`, error);
      return Promise.reject(error);
    }
  }  

  private isPromise(obj: any): obj is Promise<any> {
    const isPromise = !!obj && typeof obj.then === 'function';
    // console.log('isPromise:', isPromise, 'Value:', obj);
    return isPromise;
  }

  private isObservable(obj: any): obj is Observable<any> {
    const isObservable = !!obj && typeof obj.subscribe === 'function';
    // console.log('isObservable:', isObservable, 'Value:', obj);
    return isObservable;
  }

  private isAsyncData(obj: any): obj is AsyncData {
    const isAsyncData = !!obj && obj.service && typeof obj.method === 'string';
    // console.log('isAsyncData:', isAsyncData, 'Value:', obj);
    return isAsyncData;
  }
  
}
