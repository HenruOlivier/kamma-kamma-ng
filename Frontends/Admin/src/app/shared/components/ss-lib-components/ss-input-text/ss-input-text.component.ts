import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-input-text',
  templateUrl: './ss-input-text.component.html',
  styleUrls: ['./ss-input-text.component.scss']
})
export class SSInputTextComponent {

  @Input() value: string = '';
  @Input() disabled: boolean =  false;
  @Input() loading: Observable<boolean>;
  @Input() userVirtualKeyboard: boolean = false;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    console.log('loading in text constructor: ', this.loading)
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

}
