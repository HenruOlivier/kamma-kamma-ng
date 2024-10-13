import { Component, EventEmitter, Input, Optional, Output, Self, SimpleChanges, input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Expand } from '../../animations/expand';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-input-multiselect',
  templateUrl: './ss-input-multiselect.component.html',
  styleUrls: ['./ss-input-multiselect.component.scss'],
  animations: [Expand]
})
export class SSInputMultiselectComponent {

  @Input() value: any[] = [];
  @Input() disabled: boolean;
  @Input() dataset: any = [];
  @Input() headerField: string = '';
  @Input() subFields: Array<string> | null = null;
  @Input() imageField: string | null = null;
  @Input() roundImage: boolean = false;
  @Input() returnObject: boolean = false;
  @Input() returnField: string = '_id';
  @Input() searchEnabled: boolean = false;
  @Input() showChips: boolean = false;
  @Input() loading: Observable<boolean>;

  private _max: number = -1;
  get max(): number {
    return this._max;
  }
  @Input()
  set max(value: number | null | undefined) {
    if (typeof value === 'number' && !isNaN(value)) {
      this._max = value;
    } else {
      this._max = -1;
    }
  }

  @Output() valueChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  isOpen: boolean = false;

  datasetToShow: any = [];

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataset']) {
      this.datasetToShow = this.dataset;
    }
  }

  writeValue(value: any): void {
    this.value = value || [];

    this.datasetToShow = this.dataset;
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

    if (this.isSelectedItem(item)) {
      this.removeFromList(item);
    } else {
      if (this.max !== -1) {
        if (this.max > this.value.length) {
          this.pushIntoList(item);
        }
      } else {
        this.pushIntoList(item);
      }
    }

    this.valueChange.emit(this.value);
  }

  isItemInList(item: any) {
    if (this.value.length === 0) {
      return false;
    } else {
      if (this.returnObject && !this.returnField) {
        let isFound = this.value.find((selectItem) => selectItem._id === item._id);
        if (isFound) {
          return true;
        } else {
          return false;
        }
      }
      if (this.returnField && !this.returnObject) {
        let isFound = this.value.find((selectItem) => selectItem === item[this.returnField]);
        if (isFound) {
          return true;
        } else {
          return false;
        }
      }
      if (!this.returnObject && !this.returnField) {
        let isFound = this.value.find((selectItem) => selectItem === item._id);
        if (isFound) {
          return true;
        } else {
          return false;
        }
      }
      if (!this.returnField) {
        let isFound = this.value.indexOf(item);
        if (isFound > -1) {
          return true;
        } else {
          return false;
        }
      }
    }

    return false
  }

  pushIntoList(item: any) {
    // If adding entire objects to the list
    if (this.returnObject) {
      this.value.push(item);
    }
    // If adding based on a specific field or _id
    else {
      const valueToAdd = this.returnField ? item[this.returnField] : item['_id'];
      this.value.push(valueToAdd);
    }

    this.valueChange.emit(this.value); // Emit the change event
  }

  removeFromList(item: any): void {
    let index = -1;
    const compareField = this.returnField || '_id';

    // First, try to match as if both are objects.
    index = this.value.findIndex(selectItem =>
      typeof selectItem === 'object' && typeof item === 'object' &&
      selectItem[compareField] === item[compareField]
    );

    // If not found and item is an object, try matching object field to primitive.
    if (index === -1 && typeof item === 'object') {
      const itemValue = item[compareField];
      index = this.value.indexOf(itemValue);
    }

    // If still not found, and item is a primitive, try finding it directly.
    if (index === -1 && typeof item !== 'object') {
      index = this.value.indexOf(item);
    }

    // Remove the item if found
    if (index > -1) {
      this.value.splice(index, 1);
      this.valueChange.emit(this.value); // Notify external listeners of the change
    }
  }


  isSelectedItem(item: any): boolean {
    const compareField = this.returnField || '_id'; // Default comparison field

    return this.value.some(selectItem => {
      // If both selectItem and item are objects, compare them based on the compareField
      if (typeof item === 'object' && typeof selectItem === 'object') {
        return item[compareField] === selectItem[compareField];
      }
      // If item is an object but selectItem is a primitive (implying we're storing selected value ids or similar),
      // compare item's specified field to the selectItem directly
      else if (typeof item === 'object' && typeof selectItem !== 'object') {
        return item[compareField] === selectItem;
      }
      // If item is a primitive, it means we're comparing directly (likely selectItem is also a primitive)
      else if (typeof item !== 'object') {
        return item === selectItem;
      }
      // Fallback for any other cases not explicitly handled above
      return false;
    });
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

  getChipDisplayField() {
    if (this.returnObject && this.headerField) {
      return this.headerField;
    } else if (this.returnObject && !this.headerField) {
      return '_id';
    } else if (!this.returnObject && this.headerField) {
      return null
    } else {
      return '_id';
    }
  }

  getInfoText() {
    let total = 0;
    let selected = 0;

    try {
      total = this.dataset.length || 0;
      selected = this.value.length || 0;
    } catch (err) {

    } finally {
      return `Total ${total}, selected ${selected}`
    }
  }
}