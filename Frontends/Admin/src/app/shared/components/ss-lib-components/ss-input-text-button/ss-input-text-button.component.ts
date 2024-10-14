import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-input-text-button',
  templateUrl: './ss-input-text-button.component.html',
  styleUrls: ['./ss-input-text-button.component.scss']
})
export class SSInputTextButtonComponent {

  private _value!: string;
  @Input()
  set value(value: string) {
    this._value = value !== undefined ? value : '';
  }

  get value(): string {
    return this._value || '';
  }

  private _leftBtn!: boolean;
  @Input()
  set leftBtn(leftBtn: boolean) {
    this._leftBtn = leftBtn !== undefined ? leftBtn : false;
  }

  get leftBtn(): boolean {
    return this._leftBtn || false;
  }

  private _rightBtn!: boolean;
  @Input()
  set rightBtn(rightBtn: boolean) {
    this._rightBtn = rightBtn !== undefined ? rightBtn : false;
  }

  get rightBtn(): boolean {
    return this._rightBtn || false;
  }

  private _iconClass!: string;
  @Input()
  set iconClass(iconClass: string) {
    this._iconClass = iconClass !== undefined ? iconClass : '';
  }

  get iconClass(): string {
    return this._iconClass || '';
  }

  private _btnClass!: string;
  @Input()
  set btnClass(btnClass: string) {
    this._btnClass = btnClass !== undefined ? btnClass : '';
  }

  get btnClass(): string {
    return this._btnClass || '';
  }

  @Input() disabled: boolean = false;
  @Input() loading: Observable<boolean>;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

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

  isValid(): boolean | null {
    return this.ngControl ? this.ngControl.valid : null;
  }

  onButtonClick() {
    this.buttonClick.emit();
  }
}