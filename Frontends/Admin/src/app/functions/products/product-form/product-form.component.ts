import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SSComponentsModule } from '../../../shared/components/ss-lib-components/ss-components.module';
import { SSDirectivesModule } from '../../../shared/ss-directives/ss-directives.module';
import { ActionButtonStates } from '../../../shared/ss-directives/action-button-states';
import { Subject } from 'rxjs';
import { Product } from '../../../shared/models/product.model';
import { FormFieldDefinition, FormFieldTypes } from '../../../shared/components/ss-lib-components/ss-form-builder2/form-fields2.model';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/products/products.service';
import { SSFormController } from '../../../shared/components/ss-lib-components/ss-form-builder2/ss-form-controller.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ProductVariation } from '../../../shared/models/productVariation.model';
import { VariationFormComponent } from '../variation-form/variation-form.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, SSComponentsModule, SSDirectivesModule, VariationFormComponent],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  _id: string | null = null;
  currentProductEditable: Product | null = null;

  variationFormOpen: boolean = false;
  productVariations: ProductVariation[] = [];

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
    public formController: SSFormController,
  ) {
    // Define form fields according to the Product interface
    this.formDefinition = [
      { type: FormFieldTypes.Text, name: 'name', label: 'Product Name', required: true },
      { type: FormFieldTypes.Text, name: 'description', label: 'Description', required: false },
      { type: FormFieldTypes.Number, name: 'price', label: 'Price', required: true },
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
    this._id = this.activatedRoute.snapshot.params['_id'] || null;

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

  addVariation() {
    this.variationFormOpen = true;
  }

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
