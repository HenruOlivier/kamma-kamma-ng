import { Component, EventEmitter, Input, Optional, Output, Self, SimpleChanges } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { Expand } from '../../../animations/expand';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SSInputSearchComponent } from '../ss-input-search/ss-input-search.component';

@Component({
  selector: 'ss-input-dropselect',
  standalone: true,
  imports: [CommonModule, FormsModule, SSInputSearchComponent],
  templateUrl: './ss-input-dropselect.component.html',
  styleUrls: ['./ss-input-dropselect.component.scss'],
  animations: [Expand]
})
export class SSInputDropselectComponent {
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() dataset: any = [];
  @Input() headerField: string = '';
  @Input() subFields: Array<string> | null = null;
  @Input() imageField: string | null = null;
  @Input() roundImage: boolean = false;
  @Input() returnObject: boolean = false;
  @Input() returnField: string = '_id';
  @Input() searchEnabled: boolean = false;
  @Input() loading: Observable<boolean>;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  displayValue: string = '';

  isOpen: boolean = false;

  datasetToShow: any = [];

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.loading) {
    //   this.datasetToShow = [];
    //   return;
    // }
    if (changes['dataset']) {
      this.datasetToShow = this.dataset;
      this.updateDisplayValue();
    }
  }

  updateDisplayValue(): void {
    this.displayValue = ''; // Reset displayValue initially

    const compareField = this.returnField || '_id'; // Default compareField to '_id'

    if (this.dataset && this.value) {
      // Use updated comparison logic here to accommodate more scenarios
      for (let currentItem of this.dataset) {
        let matchFound = false;

        // Determine the type of comparison based on the types of currentItem and this.value.
        if (typeof currentItem === 'object' && typeof this.value === 'object') {
          matchFound = currentItem[compareField] === this.value[compareField];
        } else if (typeof currentItem === 'object' && typeof this.value !== 'object') {
          matchFound = currentItem[compareField] === this.value;
        } else if (typeof this.value === 'object' && typeof currentItem !== 'object') {
          matchFound = this.value[compareField] === currentItem;
        } else { // Both are primitives (not objects).
          matchFound = currentItem === this.value;
        }

        if (matchFound) {
          // Set displayValue based on the headerField or the compareField.
          this.displayValue = this.headerField && typeof currentItem === 'object' ?
            this.getFieldValue(this.headerField, currentItem) : // Use headerField from the matched object, if defined.
            (typeof currentItem === 'object' ? this.getFieldValue(compareField, currentItem) : currentItem); // Use compareField from the matched object or the currentItem itself if it's a primitive.
          break; // Break the loop once a match is found.
        }
      }
    }
  }


  writeValue(value: any): void {
    this.value = value;
    // Call updateDisplayValue to handle setting the displayValue correctly.
    this.updateDisplayValue();
  }

  registerOnChange(fn: any): void {
    this.valueChange.subscribe(fn);
    this.valueChange.emit(this.value);
  }

  registerOnTouched(): void { }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  isValid(): boolean | null {
    return this.ngControl ? this.ngControl.valid : null;
  }

  toggleSelect() {
    this.isOpen = !this.isOpen;
  }

  getFieldValue(fieldName: string, row: any) {
    if (fieldName.includes('.')) {
      return fieldName.split(".").reduce((a, v) => a[v], row)
    } else {
      return row[fieldName];
    }
  }

  onItemSelected(item: any) {
    if (this.returnObject) {
      this.value = item;
    }
    if (!this.returnObject) {
      if (this.returnField === undefined) {
        this.value = item['_id'] || null;
      } else {
        this.value = this.getFieldValue(this.returnField, item);
      }
    }

    if (this.headerField === undefined) {
      if (this.returnField === undefined) {
        this.displayValue = item['_id'] || null;
      } else {
        this.displayValue = this.getFieldValue(this.returnField, item);
      }

    } else {
      this.displayValue = this.getFieldValue(this.headerField, item);
    }
    this.valueChange.emit(this.value);

    setTimeout(() => { this.toggleSelect(); }, 100)
  }

  isSelectedItem(item: any): boolean {
    if (this.value) {
      // Define the field to use for comparison, defaulting to '_id' if returnField is not specified.
      const compareField = this.returnField || '_id';

      // If both item and value are objects, compare their specified fields.
      if (typeof item === 'object' && typeof this.value === 'object') {
        return item[compareField] === this.value[compareField];
      }
      // If item is an object but value is not, compare item's field with the value directly.
      else if (typeof item === 'object' && typeof this.value !== 'object') {
        return item[compareField] === this.value;
      }
      // If value is an object but item is not, this scenario is less common,
      // but you might still want to handle it depending on your component's usage.
      // For example, if you expect the item to match a field's value within the object,
      // you could reverse the comparison as shown below.
      else if (typeof this.value === 'object' && typeof item !== 'object') {
        return this.value[compareField] === item;
      }
      // When neither item nor value is an object, compare them directly.
      else {
        return item === this.value;
      }
    } else {
      return false;
    }
  }

  onSearchChange(event: any) {
    let searchTextValue = event;
    if (searchTextValue === '' || searchTextValue === undefined || searchTextValue === null) {
      this.datasetToShow = this.dataset;
    } else {
      let tempDS = [];

      if (this.headerField) {
        for (const obj of this.dataset) {
          if (obj.hasOwnProperty(this.headerField) && obj[this.headerField].toLowerCase().includes(searchTextValue.toLowerCase())) {
            tempDS.push(obj);
          }
        }
      } else {
        tempDS = this.dataset;
      }

      this.datasetToShow = tempDS;
    }
  }
}
