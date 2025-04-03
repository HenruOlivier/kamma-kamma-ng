import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SSComponentsModule } from '../../../shared/components/ss-lib-components/ss-components.module';
import { SSDirectivesModule } from '../../../shared/ss-directives/ss-directives.module';
import { ActionButtonStates } from '../../../shared/ss-directives/action-button-states';
import { ProductsService } from '../../../shared/services/products/products.service';
import { ProductVariation } from '../../../shared/models/productVariation.model';
import { SSInputTextComponent } from '../../../shared/components/ss-lib-components/ss-input-text/ss-input-text.component';
import { SSInputNumberComponent } from '../../../shared/components/ss-lib-components/ss-input-number/ss-input-number.component';
import { SSDataGridComponent } from '../../../shared/components/ss-lib-components/ss-data-grid/ss-data-grid.component';
import { Image } from '../../../shared/models/image.model';
import { GridDefinitionField } from '../../../shared/components/ss-lib-components/ss-data-grid/grid-definition-field.model';
import { GridManager } from '../../../shared/components/ss-lib-components/ss-data-grid/gridManager';
import { GridFieldTypes } from '../../../shared/components/ss-lib-components/ss-data-grid/grid-field-types.model';
import { environment } from '../../../../environment/environment';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImagesService } from '../../../shared/services/images/images.service';

@Component({
  selector: 'app-variation-form',
  standalone: true,
  imports: [CommonModule, SSComponentsModule, SSDirectivesModule, SSInputTextComponent, SSInputNumberComponent, SSDataGridComponent],
  templateUrl: './variation-form.component.html',
  styleUrls: ['./variation-form.component.scss']
})
export class VariationFormComponent implements OnInit {

  @Input() productVariations: ProductVariation[] = [];

  @Output() addVariation = new EventEmitter<ProductVariation[]>();

  btnState = ActionButtonStates.Idle;
  btnError = ActionButtonStates.Error;
  btnText = 'Save Product';

  groupDataLoading: boolean = true;
  configMode: boolean = false;
  configLoading: boolean = false;

  currentName: string = '';
  currentStock: number = 0;
  variationImages: Image[] = [];
  baseImgUrl = environment.baseImageUrl;

  allImages: Image[] = [];
  destroy$ = new Subject<void>();

  gridManager = new GridManager();
  errorMessage = '';

  constructor(
    public productsService: ProductsService,
    public imagesService: ImagesService
  ) {
    this.setupGridManager();
  }

  ngOnInit() {

    console.log('VariationFormComponent initialized');
    // Subscribe to the images service to get all images
    this.imagesService.allImages$
      .pipe(
        takeUntil(this.destroy$),
        tap((images: Image[]) => {
          this.allImages = images;
          this.filterImages();
        })
      )
      .subscribe();

    // Refresh images on initialization
    this.onRefresh();
  }

  setupGridManager() {
    // Define the grid fields
    const gridDefinition = [
      new GridDefinitionField('_id', 'ID', GridFieldTypes.Text, true, true, false),
      new GridDefinitionField('name', 'Name', GridFieldTypes.Text, true, true, false),
      new GridDefinitionField('description', 'Description', GridFieldTypes.Text, true, true, false),
    ];

    // Assign the grid definition to the grid manager
    this.gridManager.definition = gridDefinition;

    // Add grid controls
    this.gridManager.addGridControl({
      name: 'add',
      classList: 'ss-btn-circle-success',
      iconClass: 'bi bi-plus',
    });

    // Remove unnecessary controls
    this.gridManager.removeGridControl('Delete');
    this.gridManager.removeGridControl('Edit');

    // Disable row selection
    this.gridManager.selectActive = false;
  }

  filterImages() {
    // Filter images to exclude those already in variationImages
    const filteredImages = this.allImages.filter(
      (img) => !this.variationImages.some((variationImg) => variationImg._id === img._id)
    );

    // Assign the filtered images to the grid manager dataset
    this.gridManager.dataset = filteredImages;
  }

  addVariationImg(data: any): void {
    this.variationImages.push(data.data);
    this.filterImages();
  }

  removeVariationImg(img: Image): void {
    this.variationImages = this.variationImages.filter((image) => image._id !== img._id);
    this.filterImages();
  }

  onRefresh() {
    this.imagesService.refreshAllImages();
    console.log('Refreshing images...');
  }

  onSaveVariation(): void {
    const variationData: ProductVariation = {
      name: this.currentName,
      stockQuantity: this.currentStock,
      images: this.variationImages,
    };
    console.log('Saving variation:', variationData);
    this.productVariations.push(variationData);
    this.addVariation.emit(this.productVariations);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}