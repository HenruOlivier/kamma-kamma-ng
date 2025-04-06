import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SSComponentsModule } from '../../../shared/components/ss-lib-components/ss-components.module';
import { SSDirectivesModule } from '../../../shared/ss-directives/ss-directives.module';
import { ActionButtonStates } from '../../../shared/ss-directives/action-button-states';
import { Subject } from 'rxjs';
import { Category } from '../../../shared/models/category.model';
import { FormFieldDefinition, FormFieldTypes } from '../../../shared/components/ss-lib-components/ss-form-builder2/form-fields2.model';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { SSFormController } from '../../../shared/components/ss-lib-components/ss-form-builder2/ss-form-controller.service';
import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';
import { SSFormBuilder2Component } from '../../../shared/components/ss-lib-components/ss-form-builder2/ss-form-builder2.component';
import { GridManager } from '../../../shared/components/ss-lib-components/ss-data-grid/gridManager';
import { Image } from '../../../shared/models/image.model';
import { Product } from '../../../shared/models/product.model';
import { SSDataGridComponent } from '../../../shared/components/ss-lib-components/ss-data-grid/ss-data-grid.component';
import { ImagesService } from '../../../shared/services/images/images.service';
import { ProductsService } from '../../../shared/services/products/products.service';
import { GridDefinitionField } from '../../../shared/components/ss-lib-components/ss-data-grid/grid-definition-field.model';
import { GridFieldTypes } from '../../../shared/components/ss-lib-components/ss-data-grid/grid-field-types.model';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, SSComponentsModule, SSDirectivesModule, SSFormBuilder2Component, SSDataGridComponent],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  baseImgUrl = environment.baseImageUrl;

  _id: string | null = null;
  currentCategoryEditable: Category | null = null;

  formDefinition: FormFieldDefinition[] = [];
  btnState = ActionButtonStates.Idle;
  btnError = ActionButtonStates.Error;
  btnText = 'Save Category';

  // Cover Image
  coverImage: Image | null = null;
  coverImageGridManager = new GridManager();

  // Assigned Products
  assignedProducts: Product[] = [];
  productGridManager = new GridManager();

  allImages: Image[] = [];
  allProducts: Product[] = [];

  coverImageGridDefinition = [
    new GridDefinitionField('_id', 'ID', GridFieldTypes.Text, true, true, false),
    new GridDefinitionField('name', 'Image Name', GridFieldTypes.Text, true, true, false),
    new GridDefinitionField('url', 'Preview', GridFieldTypes.Image, true, true, false),
  ];

  productGridDefinition = [
    new GridDefinitionField('_id', 'ID', GridFieldTypes.Text, true, true, false),
    new GridDefinitionField('name', 'Product Name', GridFieldTypes.Text, true, true, false),
    new GridDefinitionField('price', 'Price', GridFieldTypes.Currency, true, true, false),
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    public categoriesService: CategoriesService,
    public formController: SSFormController,
    private imagesService: ImagesService,
    private productsService: ProductsService
  ) {
    this.formDefinition = [
      { type: FormFieldTypes.Text, name: 'name', label: 'Category Name', required: true },
      { type: FormFieldTypes.Text, name: 'description', label: 'Description', required: false },
    ];

    // Initialize Cover Image Grid Manager
    this.coverImageGridManager.definition = this.coverImageGridDefinition;
    this.coverImageGridManager.addGridControl({ name: 'add', classList: 'ss-btn-circle-success', iconClass: 'bi bi-plus' });
    this.coverImageGridManager.removeGridControl('Delete');
    this.coverImageGridManager.removeGridControl('Edit');
    this.coverImageGridManager.selectActive = false;

    // Initialize Product Grid Manager
    this.productGridManager.definition = this.productGridDefinition;
    this.productGridManager.addGridControl({ name: 'add', classList: 'ss-btn-circle-success', iconClass: 'bi bi-plus' });
    this.productGridManager.removeGridControl('Delete');
    this.productGridManager.removeGridControl('Edit');
    this.productGridManager.selectActive = false;
  }

  ngOnInit() {
    this._id = this.activatedRoute.snapshot.params['_id'] || null;

    if (this._id) {
      this.categoriesService.fetchCategoryById(this._id)
        .pipe(
          tap((response: Category | null) => {
            if (response) {
              this.currentCategoryEditable = response;
              this.formController.setFormValue(response);
              this.coverImage = response.coverImage;
              this.assignedProducts = response.products;
              this.filterImages();
              this.filterProducts();
            }
          }),
          catchError((error: any) => {
            console.error('Error fetching category:', error);
            return error;
          })
        )
        .subscribe();
    }

    this.imagesService.allImages$.pipe(takeUntil(this.destroy$)).subscribe((images: Image[]) => {
      this.allImages = images;
      this.filterImages();
    });

    this.productsService.allProducts$.pipe(takeUntil(this.destroy$)).subscribe((products: Product[]) => {
      this.allProducts = products;
      this.filterProducts();
    });

    this.imagesService.refreshAllImages();
    this.productsService.refreshAllProducts();
  }

  filterImages() {
    const filteredImages = this.allImages.filter(
      img => !this.coverImage || img._id !== this.coverImage._id
    );
    this.coverImageGridManager.dataset = filteredImages;
  }

  filterProducts() {
    const filteredProducts = this.allProducts.filter(
      product => !this.assignedProducts.some(assigned => assigned._id === product._id)
    );
    this.productGridManager.dataset = filteredProducts;
  }

  onCoverImageSelected(data: any) {
    this.coverImage = data.data;
    this.filterImages();
  }

  onProductSelected(data: any) {
    this.assignedProducts.push(data.data);
    this.filterProducts();
  }

  removeAssignedProduct(product: Product) {
    this.assignedProducts = this.assignedProducts.filter(p => p._id !== product._id);
    this.filterProducts();
  }

  onSave() {
    const formData: Category = this.formController.getFormValue();
    formData.coverImage = this.coverImage!;
    formData.products = this.assignedProducts;

    this.btnState = ActionButtonStates.Loading;

    if (this._id) {
      this.categoriesService.updateCategory(this._id, formData)
        .pipe(
          tap(() => {
            this.btnState = ActionButtonStates.Success;
          }),
          catchError((error: any) => {
            this.btnState = ActionButtonStates.Error;
            console.error('Error updating category:', error);
            return error;
          }),
          finalize(() => {
            this.btnState = ActionButtonStates.Idle;
          })
        )
        .subscribe();
    } else {
      this.categoriesService.addCategory(formData)
        .pipe(
          tap(() => {
            this.btnState = ActionButtonStates.Success;
          }),
          catchError((error: any) => {
            this.btnState = ActionButtonStates.Error;
            console.error('Error creating category:', error);
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