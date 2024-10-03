import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';

@Component({
  selector: 'input-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss']
})
export class InputCheckboxComponent {

  @Input() value: boolean = false;
  @Input() disabled: boolean = false;
  @Input() loading: boolean | null = false;

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

  toggleCheckbox() {
    this.value = !this.value;
    this.valueChange.emit(this.value);
}

  isValid(): boolean | null {
    return this.ngControl.valid;
  }
}
