import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { roundToStepSizeDecimalPlaces } from '../../helpers/helpers';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-input-number',
  templateUrl: './ss-input-number.component.html',
  styleUrls: ['./ss-input-number.component.scss']
})
export class SSInputNumberComponent {

  private _min: number;
  @Input()
  set min(value: number) {
    this._min = value !== undefined ? value : 0;
  }

  get min(): number {
    return Number(this._min) || 0;
  }

  private _max: number;
  @Input()
  set max(value: number) {
    this._max = value !== undefined ? value : 100;
  }

  get max(): number {
    return Number(this._max) || 100;
  }

  private _stepSize: number;
  @Input()
  set stepSize(value: number) {
    this._stepSize = value !== undefined ? value : 1;
  }

  get stepSize(): number {
    return Number(this._stepSize) || 1;
  }

  private _value: number;
  @Input()
  set value(value: number) {
    this._value = value !== undefined ? value : 0;
  }

  get value(): number {
    return Number(this._value) || 0;
  }

  @Input() disabled: boolean;

  @Input() loading: Observable<boolean>;

  @Input() userVirtualKeyboard: boolean = false;

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

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

  onPlus() {
    if (this.max !== undefined && this.max !== null) {
      if (this.value + this.stepSize <= this.max) {
        this.value = this.value + this.stepSize;
        this.value = roundToStepSizeDecimalPlaces(this.value, this.stepSize);
        this.valueChange.emit(this.value);
      }
    }
  }

  onMinus() {
    if (this.min !== undefined && this._min !== null) {
      if (this.value - this.stepSize >= this.min) {
        this.value = this.value - this.stepSize;
        this.value = roundToStepSizeDecimalPlaces(this.value, this.stepSize);
        this.valueChange.emit(this.value);
      }
    }
  }
}