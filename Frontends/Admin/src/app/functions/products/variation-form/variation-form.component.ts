import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SSComponentsModule } from '../../../shared/components/ss-lib-components/ss-components.module';
import { SSDirectivesModule } from '../../../shared/ss-directives/ss-directives.module';
import { ActionButtonStates } from '../../../shared/ss-directives/action-button-states';
// import { FormFieldDefinition, FormFieldTypes } from '../../../shared/components/ss-lib-components/ss-form-builder2/form-fields2.model';
import { ProductsService } from '../../../shared/services/products/products.service';
import { SSFormController } from '../../../shared/components/ss-lib-components/ss-form-builder2/ss-form-controller.service';
import { ProductVariation } from '../../../shared/models/productVariation.model';
import { SSInputTextComponent } from '../../../shared/components/ss-lib-components/ss-input-text/ss-input-text.component';
import { SSInputNumberComponent } from '../../../shared/components/ss-lib-components/ss-input-number/ss-input-number.component';

@Component({
  selector: 'app-variation-form',
  standalone: true,
  imports: [CommonModule, SSComponentsModule, SSDirectivesModule, SSInputTextComponent, SSInputNumberComponent],
  templateUrl: './variation-form.component.html',
  styleUrl: './variation-form.component.scss'
})
export class VariationFormComponent {

  @Input() productVariations: ProductVariation[] = [];

  @Output() addVariation = new EventEmitter<ProductVariation[]>();

  // formDefinition: FormFieldDefinition[] = [];

  btnState = ActionButtonStates.Idle;
  btnError = ActionButtonStates.Error;
  btnText = 'Save Product';

  groupDataLoading: boolean = true;
  configMode: boolean = false;
  configLoading: boolean = false;

  currentName: string = '';
  currentStock: number = 0;

  constructor(
    public productsService: ProductsService,
    // public formController: SSFormController,
  ) {
    // this.formDefinition = [
    //   { type: FormFieldTypes.Text, name: 'name', label: 'Variation Name', required: true },
    //   { type: FormFieldTypes.Number, name: 'stockQuantity', label: 'Stock Quantity', required: true },
    // ];
  }

  onSaveVariation() {
    // const variationData: ProductVariation = this.formController.getFormValue();
    const variationData: ProductVariation = {name: this.currentName, stockQuantity: this.currentStock, images: []};
    console.log('Variation data to save:', variationData);
    this.productVariations.push(variationData);
    this.addVariation.emit(this.productVariations);
  }

}