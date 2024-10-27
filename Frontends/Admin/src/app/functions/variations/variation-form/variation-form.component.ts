import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SSComponentsModule } from '../../../shared/components/ss-lib-components/ss-components.module';
import { SSDirectivesModule } from '../../../shared/ss-directives/ss-directives.module';
import { ActionButtonStates } from '../../../shared/ss-directives/action-button-states';
import { Subject } from 'rxjs';
import { ProductVariation } from '../../../shared/models/productVariation.model';
import { FormFieldDefinition, FormFieldTypes } from '../../../shared/components/ss-lib-components/ss-form-builder2/form-fields2.model';
import { ActivatedRoute } from '@angular/router';
import { VariationsService } from '../../../shared/services/variations/variations.service';
import { SSFormController } from '../../../shared/components/ss-lib-components/ss-form-builder2/ss-form-controller.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ProductsService } from '../../../shared/services/products/products.service';

@Component({
  selector: 'app-variation-form',
  standalone: true,
  imports: [CommonModule, SSComponentsModule, SSDirectivesModule],
  templateUrl: './variation-form.component.html',
  styleUrls: ['./variation-form.component.scss']
})
export class VariationFormComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  _id: string | null = null;
  currentVariationEditable: ProductVariation | null = null;

  formDefinition: FormFieldDefinition[] = [];

  btnState = ActionButtonStates.Idle;
  btnError = ActionButtonStates.Error;
  btnText = 'Save Variation';

  constructor(
    private activatedRoute: ActivatedRoute,
    public variationsService: VariationsService,
    private productsService: ProductsService,
    public formController: SSFormController
  ) {
    // Define form fields according to the ProductVariation interface
    this.formDefinition = [
      { type: FormFieldTypes.Text, name: 'optionName', label: 'Option Name', required: true },
      { type: FormFieldTypes.Text, name: 'optionValue', label: 'Option Value', required: true },
      { type: FormFieldTypes.Number, name: 'price', label: 'Price', required: true },
      { type: FormFieldTypes.Number, name: 'stockQuantity', label: 'Stock Quantity', required: true },
      { 
        type: FormFieldTypes.Select, 
        name: 'productId', 
        label: 'Product', 
        required: true, 
        dataset: this.productsService.fetchAllProducts(), // Assuming variations service can fetch products
        headerField: 'name', 
        searchEnabled: true 
      },
    ];
  }

  ngOnInit() {
    this._id = this.activatedRoute.snapshot.params['_id'] || null;

    if (this._id) {
      this.variationsService.fetchVariationById(this._id)
        .pipe(
          tap((response: ProductVariation | null) => {
            if (response) {
              this.currentVariationEditable = response;
              this.formController.setFormValue(response);
            }
          }),
          catchError((error: any) => {
            console.error('Error fetching variation:', error);
            return error;
          })
        )
        .subscribe();
    }
  }

  onSave() {
    const formData: ProductVariation = this.formController.getFormValue();
    this.btnState = ActionButtonStates.Loading;

    if (this._id) {
      this.variationsService.updateVariation(this._id, formData)
        .pipe(
          tap(() => {
            this.btnState = ActionButtonStates.Success;
          }),
          catchError((error: any) => {
            this.btnState = ActionButtonStates.Error;
            console.error('Error updating variation:', error);
            return error;
          }),
          finalize(() => {
            this.btnState = ActionButtonStates.Idle;
          })
        )
        .subscribe();
    } else {
      this.variationsService.addVariation(formData)
        .pipe(
          tap(() => {
            this.btnState = ActionButtonStates.Success;
          }),
          catchError((error: any) => {
            this.btnState = ActionButtonStates.Error;
            console.error('Error creating variation:', error);
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