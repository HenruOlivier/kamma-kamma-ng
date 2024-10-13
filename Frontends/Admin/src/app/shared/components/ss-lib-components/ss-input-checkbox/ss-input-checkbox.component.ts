import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-input-checkbox',
  templateUrl: './ss-input-checkbox.component.html',
  styleUrls: ['./ss-input-checkbox.component.scss']
})
export class SSInputCheckboxComponent {

  @Input() value: boolean = false;
  @Input() disabled: boolean;
  @Input() loading: Observable<boolean>;

  @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    this.value = value;
    if (!value) {
      this.value = false;
      this.valueChange.emit(false);
    }
  }

  registerOnChange(fn: any): void {
    this.valueChange.subscribe(fn);
    this.valueChange.emit(this.value);
  }

  registerOnTouched(): void { }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleCheckbox() {
    this.value = !this.value;
    this.valueChange.emit(this.value);
  }

  isValid(): boolean | null {
    return this.ngControl ? this.ngControl.valid : null;
  }
}
