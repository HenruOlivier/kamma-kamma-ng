import { Component } from '@angular/core';
import { SSDataGridComponent } from '../../../shared/components/ss-lib-components/ss-data-grid/ss-data-grid.component';
import { GridDefinitionField } from '../../../shared/components/ss-lib-components/ss-data-grid/grid-definition-field.model';
import { GridFieldTypes } from '../../../shared/components/ss-lib-components/ss-data-grid/grid-field-types.model';
import { GridManager } from '../../../shared/components/ss-lib-components/ss-data-grid/gridManager';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../shared/models/category.model';

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [SSDataGridComponent, AsyncPipe],
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.scss']
})
export class CategoryGridComponent {

  gridManager = new GridManager;
  errorMessage: string = '';

  gridDefinition = [
    new GridDefinitionField('_id', 'id', GridFieldTypes.Text, true, true, false),
    new GridDefinitionField('name', 'Name', GridFieldTypes.Text, true, true, false),
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public categoriesService: CategoriesService
  ) {
    this.gridManager.definition = this.gridDefinition;
    this.onRefresh();
  }

  ngOnInit(): void {
    this.categoriesService.allCategories$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((categories: any) => {
      console.log('categories: ', categories);
      this.gridManager.dataset = categories;
    });
  }

  onRefresh() {
    this.categoriesService.refreshAllCategories();
  }

  onCreateNew() {
    this.router.navigate(['form'], { relativeTo: this.route });
  }

  onEditSingle(data: Category) {
    this.router.navigate(['form', data._id], { relativeTo: this.route });
  }

  onDeleteSingle(data: Category) {
    this.categoriesService.deleteCategory(data._id)
      .subscribe();
  }

  onDeleteMany(data: Category[]) {
    // Implement mass delete if needed
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
