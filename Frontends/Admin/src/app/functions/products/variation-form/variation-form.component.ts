import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { SSComponentsModule } from '../../../shared/components/ss-lib-components/ss-components.module';
import { SSDirectivesModule } from '../../../shared/ss-directives/ss-directives.module';
import { ActionButtonStates } from '../../../shared/ss-directives/action-button-states';
import { FormFieldDefinition, FormFieldTypes } from '../../../shared/components/ss-lib-components/ss-form-builder2/form-fields2.model';
import { ProductsService } from '../../../shared/services/products/products.service';
import { SSFormController } from '../../../shared/components/ss-lib-components/ss-form-builder2/ss-form-controller.service';
import { ProductVariation } from '../../../shared/models/productVariation.model';

@Component({
  selector: 'app-variation-form',
  standalone: true,
  imports: [CommonModule, SSComponentsModule, SSDirectivesModule],
  templateUrl: './variation-form.component.html',
  styleUrl: './variation-form.component.scss'
})
export class VariationFormComponent {

  @Output() addVariation = new EventEmitter<ProductVariation[]>();

  productVariations: ProductVariation[] = [];

  formDefinition: FormFieldDefinition[] = [];

  btnState = ActionButtonStates.Idle;
  btnError = ActionButtonStates.Error;
  btnText = 'Save Product';

  groupDataLoading: boolean = true;
  configMode: boolean = false;
  configLoading: boolean = false;

  constructor(
    public productsService: ProductsService,
    public formController: SSFormController,
  ) {
    this.formDefinition = [
      { type: FormFieldTypes.Text, name: 'name', label: 'Variation Name', required: true },
      { type: FormFieldTypes.Number, name: 'stockQuantity', label: 'Stock Quantity', required: true },
    ];
  }

  onSaveVariation() {
    const variationData: ProductVariation = this.formController.getFormValue();
    console.log('Variation data to save:', variationData);
    this.productVariations.push(variationData);
    this.addVariation.emit(this.productVariations);
  }

}