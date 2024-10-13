import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-input-range-slider',
  templateUrl: './ss-input-range-slider.component.html',
  styleUrls: ['./ss-input-range-slider.component.scss']
})
export class SSInputRangeSliderComponent {

  private _min: number = 0;
  private _max: number = 100;
  private _step: number = 1;

  private _value: number = 0;

  private _before: string = '';
  private _after: string = '';

  @Input() disabled: boolean;
  @Input() loading: Observable<boolean>;

  @Input()
  set value(value: number) {
    this._value = value !== null && value !== undefined ? value : 0;
    this.adjustValueToBounds();
  }
  get value(): number {
    return this._value;
  }

  @Input()
  set min(value: number) {
    this._min = value !== null && value !== undefined ? value : 0;
    this.adjustValueToBounds();
  }
  get min(): number {
    return this._min;
  }

  @Input()
  set max(value: number) {
    this._max = value !== null && value !== undefined ? value : 100;
    this.adjustValueToBounds();
  }
  get max(): number {
    return this._max;
  }

  @Input()
  set step(value: number) {
    this._step = value !== null && value !== undefined ? value : 1;
  }
  get step(): number {
    return this._step;
  }

  @Input()
  set before(value: string) {
    this._before = value !== null && value !== undefined ? value : '';
  }
  get before(): string {
    return this._before;
  }

  @Input()
  set after(value: string) {
    this._after = value !== null && value !== undefined ? value : '';
  }
  get after(): string {
    return this._after;
  }

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  adjustValueToBounds() {
    if (this._value < this._min) {
      this._value = this._min;
    } else if (this._value > this._max) {
      this._value = this._max;
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
      if (this.value + this.step <= this.max) {
        this.value = this.value + this.step;
        this.valueChange.emit(this.value);
      }
    }
  }

  onMinus() {
    if (this.min !== undefined && this.min !== null) {
      if (this.value - this.step >= this.min) {
        this.value = this.value - this.step;
        this.valueChange.emit(this.value);
      }
    }
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.value = Number(inputElement.value) || 0;
  }
}
