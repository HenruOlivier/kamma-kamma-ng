import { Component } from '@angular/core';
import { SSDataGridComponent } from '../../../shared/components/ss-lib-components/ss-data-grid/ss-data-grid.component';
import { GridDefinitionField } from '../../../shared/components/ss-lib-components/ss-data-grid/grid-definition-field.model';
import { GridFieldTypes } from '../../../shared/components/ss-lib-components/ss-data-grid/grid-field-types.model';
import { GridManager } from '../../../shared/components/ss-lib-components/ss-data-grid/gridManager';
import { ProductsService } from '../../../shared/services/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [SSDataGridComponent, AsyncPipe],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.scss'
})
export class ProductGridComponent {

  gridManager = new GridManager;
  dataSet: any[] = [];

  gridDefinition = [
    new GridDefinitionField('_id', 'id', GridFieldTypes.Text, true, true, false),
    new GridDefinitionField('name', 'Name', GridFieldTypes.Text, true, true, false),
    new GridDefinitionField('price', 'price', GridFieldTypes.Text, true, true, false),
  ];

  errorMessage: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public productService: ProductsService
  ) {
    this.gridManager.definition = this.gridDefinition;
    this.onRefresh();
  }

  ngOnInit(): void {

    this.productService.allProducts$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((products: any) => {
      console.log('products: ', products)
      this.gridManager.dataset = products;
    });

  }

  onRefresh() {
    this.productService.refreshAllProducts();
  }

  onCreateNew() {
    this.router.navigate(['form'], { relativeTo: this.route });
  }

  onEditSingle(data: Product) {
    // this.router.navigate(['water-tank-group-form', data._id]);
    this.router.navigate(['form', data._id], { relativeTo: this.route });
  }

  onDeleteSingle(data: Product) {
    this.productService.deleteProduct(data._id)
      .subscribe();
  }

  onDeleteMany(data: Product[]) {
    
  }

}
