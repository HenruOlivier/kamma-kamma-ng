import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-input-password',
  templateUrl: './ss-input-password.component.html',
  styleUrls: ['./ss-input-password.component.scss']
})
export class SSInputPasswordComponent {
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() loading: Observable<boolean>;
  @Input() userVirtualKeyboard: boolean = false;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  showPassword: boolean = false;

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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  isValid(): boolean | null {
    return this.ngControl ? this.ngControl.valid : null;
  }
}
