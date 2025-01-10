import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SSDirectivesModule } from '../../../shared/ss-directives/ss-directives.module';
import { SSComponentsModule } from '../../../shared/components/ss-lib-components/ss-components.module';
import { FormFieldDefinition, FormFieldTypes } from '../../../shared/components/ss-form-builder2/form-fields2.model';
import { SSFormController } from '../../../shared/components/ss-form-builder2/ss-form-controller.service';
import { ProductVariation } from '../../../shared/models/productVariation.model';
import { ActionButtonStates } from '../../../shared/ss-directives/action-button-states';

@Component({
  selector: 'app-variation-form',
  standalone: true,
  imports: [CommonModule, SSComponentsModule, SSDirectivesModule],
  templateUrl: './variation-form.component.html',
  styleUrl: './variation-form.component.scss'
})
export class VariationFormComponent {

  variationFormDefinition: FormFieldDefinition[] = [];

  productVariations: ProductVariation[] = [];

  btnState = ActionButtonStates.Idle;

  constructor(
    public variationFormController: SSFormController
  ) {
    // Define form fields according to the Product interface
    this.variationFormDefinition = [
      { type: FormFieldTypes.Text, name: 'name', label: 'Variation Name', required: true },
      { type: FormFieldTypes.Number, name: 'stockQuantity', label: 'Stock Quantity', required: true },
    ]
  }

  onSaveVariation() {
    const variationData: ProductVariation = this.variationFormController.getFormValue();
    console.log('Variation data to save:', variationData);
    this.productVariations.push(variationData);
  }

}
