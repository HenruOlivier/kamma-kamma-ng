import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Optional, Output, Self, SimpleChanges } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-input-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ss-input-search.component.html',
  styleUrls: ['./ss-input-search.component.scss']
})
export class SSInputSearchComponent {
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() loading: Observable<boolean>;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  iconClass: string = 'bi bi-x-lg';

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.iconClass = this.disabled ? 'bi bi-lock-fill disabled' : 'bi bi-x-lg';
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

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    this.valueChange.emit(inputValue);
  }

  onClear() {
    this.value = '';
    this.valueChange.emit(this.value);
  }
}