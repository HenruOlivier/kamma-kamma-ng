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
import { catchError, finalize, tap } from 'rxjs/operators';
import { SSFormBuilder2Component } from '../../../shared/components/ss-lib-components/ss-form-builder2/ss-form-builder2.component';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, SSComponentsModule, SSDirectivesModule, SSFormBuilder2Component],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  _id: string | null = null;
  currentCategoryEditable: Category | null = null;

  formDefinition: FormFieldDefinition[] = [];

  btnState = ActionButtonStates.Idle;
  btnError = ActionButtonStates.Error;
  btnText = 'Save Category';

  constructor(
    private activatedRoute: ActivatedRoute,
    public categoriesService: CategoriesService,
    public formController: SSFormController
  ) {
    // Define form fields according to the Category interface
    this.formDefinition = [
      { type: FormFieldTypes.Text, name: 'name', label: 'Category Name', required: true },
      { type: FormFieldTypes.Text, name: 'description', label: 'Description', required: false },
    ];
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
            }
          }),
          catchError((error: any) => {
            console.error('Error fetching category:', error);
            return error;
          })
        )
        .subscribe();
    }
  }

  onSave() {
    const formData: Category = this.formController.getFormValue();
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