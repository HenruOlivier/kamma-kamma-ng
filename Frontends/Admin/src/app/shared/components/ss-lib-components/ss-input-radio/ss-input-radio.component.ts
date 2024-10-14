import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormRadioOption } from './form-radio-option.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-input-radio',
  templateUrl: './ss-input-radio.component.html',
  styleUrls: ['./ss-input-radio.component.scss']
})
export class SSInputRadioComponent {

  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() radioOptions: FormRadioOption[] = [];
  @Input() loading: Observable<boolean>;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    this.value = value;
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

  onRadioSelect(radio: FormRadioOption) {
    if (radio.value) {
      this.value = radio.value;
      this.valueChange.emit(this.value);
    }
  }

  isSelected(radio: FormRadioOption): boolean {
    if (this.value === radio.value) {
      return true;
    } else {
      return false;
    }
  }
}
