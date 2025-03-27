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
import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';
import { ProductVariation } from '../../../shared/models/productVariation.model';
import { VariationFormComponent } from '../variation-form/variation-form.component';
import { SSFormBuilder2Component } from '../../../shared/components/ss-lib-components/ss-form-builder2/ss-form-builder2.component';
import { SSDataGridComponent } from '../../../shared/components/ss-lib-components/ss-data-grid/ss-data-grid.component';
import { GridDefinitionField } from '../../../shared/components/ss-lib-components/ss-data-grid/grid-definition-field.model';
import { GridManager } from '../../../shared/components/ss-lib-components/ss-data-grid/gridManager';
import { GridFieldTypes } from '../../../shared/components/ss-lib-components/ss-data-grid/grid-field-types.model';
import { ImagesService } from '../../../shared/services/images/images.service';
import { environment } from '../../../../environment/environment';
import { Image } from '../../../shared/models/image.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, SSComponentsModule, SSDirectivesModule, VariationFormComponent, SSFormBuilder2Component, SSDataGridComponent],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  baseImgUrl = environment.baseImageUrl;

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

  gridManager = new GridManager;
  errorMessage: string = '';

  currentImages: Image[] = [];

  allImages: Image[] = [];

  gridDefinition = [
    new GridDefinitionField('_id', 'id', GridFieldTypes.Text, true, true, false),
    new GridDefinitionField('name', 'Name', GridFieldTypes.Text, true, true, false),
    new GridDefinitionField('description', 'Description', GridFieldTypes.Text, true, true, false),
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    public productsService: ProductsService,
    public formController: SSFormController,
    public imagesService: ImagesService
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

    this.gridManager.definition = this.gridDefinition;
    this.gridManager.addGridControl({name: 'add', classList: 'ss-btn-circle-success', iconClass: 'bi bi-plus'});
    this.gridManager.removeGridControl('Delete');
    this.gridManager.removeGridControl('Edit');
    this.gridManager.selectActive = false;

    this.onRefresh();

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
              this.productVariations = response.variations;
              this.currentImages = response.images;
              console.log('variations: ', response.variations)
              this.formController.setFormValue(response);
              this.filterImages();
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

    this.imagesService.allImages$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((images: Image[]) => {
      // Filter images to exclude those already in currentImages
      // let filteredImages = images.filter(img => 
      //   !this.currentImages.some(currentImg => currentImg._id === img._id)
      // );
  
      // this.gridManager.dataset = filteredImages;
      this.allImages = images;
      this.filterImages();
    });

    // setInterval(() => {
    //   const formData: any = this.formController.getFormValue();
    //   console.log('form data: ', formData)
    // }, 3000)
  }

  filterImages() {
    let filteredImages = this.allImages.filter(img => 
      !this.currentImages.some(currentImg => currentImg._id === img._id)
    );

    this.gridManager.dataset = filteredImages;
  }

  addVariation() {
    this.variationFormOpen = true;
  }

  onSaveVariation(variationData: ProductVariation[]) {
    console.log('Variation data to save:', variationData);
    this.productVariations = variationData;
    this.variationFormOpen = false;
  }

  addImg(data: any) {
    console.log('controle trigger: ', data.data);
    this.currentImages.push(data.data);
    this.filterImages();
  }

  removeImg(img: Image) {
    // Remove the image from currentImages
    this.currentImages = this.currentImages.filter(currentImg => currentImg._id !== img._id);
  
    // Refresh the grid dataset by filtering available images again
    this.filterImages();
  }

  onRefresh() {
    this.imagesService.refreshAllImages();
  }

  onSave() {
    // Log form data
    const formData: Product = {...this.formController.getFormValue(), variations: this.productVariations, images: this.currentImages};
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
