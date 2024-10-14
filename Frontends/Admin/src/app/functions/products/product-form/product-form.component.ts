// import { CommonModule } from '@angular/common';
// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { SSComponentsModule } from '../../../shared/components/ss-lib-components/ss-components.module';
// import { SSDirectivesModule } from '../../../shared/ss-directives/ss-directives.module';
// import { ActionButtonStates } from '../../../shared/ss-directives/action-button-states';
// import { Subject } from 'rxjs';
// import { Product } from '../../../shared/models/product.model';
// import { FormFieldDefinition, FormFieldTypes } from '../../../shared/components/ss-lib-components/ss-form-builder2/form-fields2.model';
// import { ActivatedRoute } from '@angular/router';
// import { ProductsService } from '../../../shared/services/products.service';
// import { SSFormController } from '../../../shared/components/ss-lib-components/ss-form-builder2/ss-form-controller.service';

// @Component({
//   selector: 'app-product-form',
//   standalone: true,
//   imports: [CommonModule, SSComponentsModule, SSDirectivesModule],
//   templateUrl: './product-form.component.html',
//   styleUrl: './product-form.component.scss'
// })
// export class ProductFormComponent implements OnInit, OnDestroy {

//   destroy$ = new Subject<void>();

//   _id: string | null = null;

//   currentProductEditable: Product | null = null;

//   formDefinition: FormFieldDefinition[] = [];

//   btnState = ActionButtonStates.Idle;
//   btnError = ActionButtonStates.Error;

//   btnText = '';

//   groupDataLoading: boolean = true;

//   showDialog: boolean = false;

//   dialogActualWeight: number | null = 0;
//   dialogRawValue: number | null = 0;

//   saveCalMessage: string | null = null;

//   // currentActualWeight: number = 0;
//   // currentRawValue: number | null = 0;
//   currentEstimatedWeight: number | null = 0;

//   configMode: boolean = false;
//   configLoading: boolean = false;

//   calibrationDialogMessage: string = '';

//   constructor(
//     private activatedRoute: ActivatedRoute,
//     public productsService: ProductsService,
//     // public scaleGroupService: ScaleGroupService,
//     public formController: SSFormController
//   ) {

//     this.formDefinition = [
//       { type: FormFieldTypes.Number, name: 'serial', label: 'Serial', required: true },
//       { type: FormFieldTypes.Text, name: 'displayName', label: 'Display Name', required: true },
//       { type: FormFieldTypes.Select, name: 'group', label: 'Group', required: false, dataset: this.productsService.fetchAllProducts(), headerField: 'groupName', searchEnabled: true },
//       { type: FormFieldTypes.Checkbox, name: 'configMode', label: 'Config Mode', required: true },
//     ];

//   }

//   ngOnInit() {

//     this._id = this.activatedRoute.snapshot.params['_deviceId'] || null;

//     if (this._id) {
//       this.productsService.fetchProductById(this._id)
//         .subscribe(
//           (response) => {
//             if (response) {
//               this.currentScaleEditable = response;
//               this.formController.setFormValue(response);
//               // this.configMode = response.configMode;
//               this.weightCalibrationData = response.weightCalibration;
//               this.temperatureCalibrationData = response.temperatureCalibration;
//               this.voltageCalibrationData = response.voltageCalibration;
//               this.batteryCalibrationData = response.batteryCalibration;
//               this.scaleService.setCurrentSerial(response.serial);
//               // console.log('response: ', response);
//               // this.getAllGroups();
//             } else {
//               console.error('No data received');
//             }
//             // this.getAllGroups();
//           }
//         )
//     } else {
//       this.weightCalibrationData = [...DEFAULT_SCALE_TEMPERATURE_CALIBRATION];
//       this.temperatureCalibrationData = [...DEFAULT_SCALE_TEMPERATURE_CALIBRATION];
//     }
//   }

//   onFormValueChange(data: any) {
//     console.log('onFormValueChange', data);
//     if (data.serial) {
//       this.onConfigModeChange(data.configMode);
//     }
//   }

//   onConfigModeChange(data: boolean) {
//     console.log('onConfigModeChange', data);
//     if (this._id && this.configMode != data && !this.configLoading)  {
//       this.configLoading = true;
//       this.scaleService.updateScaleConfigMode(this._id, data)
//       .pipe(
//         tap((res) => {
//           this.configMode = data;
//         }),
//         catchError(error => {
//           console.error(error);
//           this.configMode = !data;
//           return error;
//         }),
//         finalize(() => {
//           this.configLoading = false;
//         })
//       )
//       .subscribe();
//     } else {
//       this.configMode = data;
//     }
//   }

//   onSave() {

//     console.log('this.formManager.formResult: ', this.formController.getFormValue());

//     console.log(this.formController.getFormValue().group);

//     this.btnState = ActionButtonStates.Loading;

//     let updatedScaleValues: Scale = {...this.formController.getFormValue(), weightCalibration: this.weightCalibrationData, temperatureCalibration: this.temperatureCalibrationData, voltageCalibration: this.voltageCalibrationData, batteryCalibration: this.batteryCalibrationData};

//     if (this._id) {
//       this.scaleService.editScale(this._id, updatedScaleValues, this.currentScaleEditable?.group)
//         .subscribe(
//           (response) => {
//             this.btnState = ActionButtonStates.Success;
//           },
//           error => {
//             this.btnState = ActionButtonStates.Error;
//           }
//         )
//     } else {
//       this.scaleService.createScale(updatedScaleValues)
//         .subscribe(
//           (response) => {
//             this.btnState = ActionButtonStates.Success;
//           },
//           error => {
//             this.btnState = ActionButtonStates.Error;
//           }
//         )
//     }

//   }



//   ngOnDestroy() {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

// }


import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SSComponentsModule } from '../../../shared/components/ss-lib-components/ss-components.module';
import { SSDirectivesModule } from '../../../shared/ss-directives/ss-directives.module';
import { ActionButtonStates } from '../../../shared/ss-directives/action-button-states';
import { Subject } from 'rxjs';
import { Product } from '../../../shared/models/product.model';
import { FormFieldDefinition, FormFieldTypes } from '../../../shared/components/ss-lib-components/ss-form-builder2/form-fields2.model';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import { SSFormController } from '../../../shared/components/ss-lib-components/ss-form-builder2/ss-form-controller.service';
import { catchError, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, SSComponentsModule, SSDirectivesModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  _id: string | null = null;
  currentProductEditable: Product | null = null;

  formDefinition: FormFieldDefinition[] = [];

  btnState = ActionButtonStates.Idle;
  btnError = ActionButtonStates.Error;
  btnText = 'Save Product';

  groupDataLoading: boolean = true;
  configMode: boolean = false;
  configLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public productsService: ProductsService,
    public formController: SSFormController
  ) {
    // Define form fields according to the Product interface
    this.formDefinition = [
      { type: FormFieldTypes.Text, name: 'name', label: 'Product Name', required: true },
      { type: FormFieldTypes.Text, name: 'description', label: 'Description', required: false },
      { type: FormFieldTypes.Number, name: 'price', label: 'Price', required: true },
      { type: FormFieldTypes.Number, name: 'quantity', label: 'Quantity', required: false },
      { type: FormFieldTypes.Checkbox, name: 'isHireable', label: 'Is Hireable', required: true },
      { type: FormFieldTypes.Checkbox, name: 'isForSale', label: 'Is For Sale', required: true },
      { type: FormFieldTypes.Number, name: 'stockQuantity', label: 'Stock Quantity', required: true },
      { 
        type: FormFieldTypes.Select, 
        name: 'categories', 
        label: 'Categories', 
        required: false, 
        dataset: this.productsService.fetchAllProducts(), 
        headerField: 'name', 
        searchEnabled: true 
      },
    ];
  }

  ngOnInit() {
    // Fetch the product ID from the route
    this._id = this.activatedRoute.snapshot.params['id'] || null;

    if (this._id) {
      // If editing an existing product, fetch it by ID
      this.productsService.fetchProductById(this._id)
        .pipe(
          tap((response: Product | null) => {
            if (response) {
              this.currentProductEditable = response;
              this.formController.setFormValue(response);
            } else {
              console.error('No data received for the product.');
            }
          }),
          catchError((error: any) => {
            console.error('Error fetching product:', error);
            return error;
          }),
        )
        .subscribe();
    }
  }

  // onFormValueChange(data: any) {
  //   console.log('Form value changed:', data);
  //   // Handle form value changes if needed
  // }

  onSave() {
    // Log form data
    const formData: Product = this.formController.getFormValue();
    console.log('Form data to save:', formData);

    this.btnState = ActionButtonStates.Loading;

    if (this._id) {
      // Update existing product
      this.productsService.updateProduct(this._id, formData)
        .pipe(
          tap(() => {
            this.btnState = ActionButtonStates.Success;
          }),
          catchError((error: any) => {
            console.error('Error updating product:', error);
            this.btnState = ActionButtonStates.Error;
            return error;
          }),
          finalize(() => {
            this.btnState = ActionButtonStates.Idle;
          })
        )
        .subscribe();
    } else {
      // Create a new product
      this.productsService.addProduct(formData)
        .pipe(
          tap(() => {
            this.btnState = ActionButtonStates.Success;
          }),
          catchError((error: any) => {
            console.error('Error creating product:', error);
            this.btnState = ActionButtonStates.Error;
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
