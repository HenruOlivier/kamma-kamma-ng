import { Component } from '@angular/core';
import { DataGridComponent } from '../../../shared/components/data-grid/data-grid.component';
import { GridDefinitionField } from '../../../shared/components/data-grid/grid-definition-field.model';
import { GridFieldTypes } from '../../../shared/components/data-grid/grid-field-types.model';
import { GridManager } from '../../../shared/components/data-grid/gridManager';
import { VariationsService } from '../../../shared/services/variations/variations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ProductVariation } from '../../../shared/models/productVariation.model';

@Component({
  selector: 'app-variation-grid',
  standalone: true,
  imports: [DataGridComponent, AsyncPipe],
  templateUrl: './variation-grid.component.html',
  styleUrls: ['./variation-grid.component.scss']
})
export class VariationGridComponent {

  gridManager = new GridManager;
  errorMessage: string = '';

  gridDefinition = [
    new GridDefinitionField('_id', 'id', GridFieldTypes.Text, true, true, false),
    new GridDefinitionField('optionName', 'Option Name', GridFieldTypes.Text, true, true, false),
    new GridDefinitionField('optionValue', 'Option Value', GridFieldTypes.Text, true, true, false),
    new GridDefinitionField('price', 'Price', GridFieldTypes.Count, true, true, false),
    new GridDefinitionField('stockQuantity', 'Stock Quantity', GridFieldTypes.Count, true, true, false),
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public variationsService: VariationsService
  ) {
    this.gridManager.definition = this.gridDefinition;
    this.onRefresh();
  }

  ngOnInit(): void {
    this.variationsService.allVariations$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((variations: any) => {
      this.gridManager.dataset = variations;
    });
  }

  onRefresh() {
    this.variationsService.fetchAllVariations();
  }

  onCreateNew() {
    this.router.navigate(['form'], { relativeTo: this.route });
  }

  onEditSingle(data: ProductVariation) {
    this.router.navigate(['form', data._id], { relativeTo: this.route });
  }

  onDeleteSingle(data: ProductVariation) {
    this.variationsService.deleteVariation(data._id)
      .subscribe();
  }

  onDeleteMany(data: ProductVariation[]) {
    // Implement mass delete logic if needed
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}