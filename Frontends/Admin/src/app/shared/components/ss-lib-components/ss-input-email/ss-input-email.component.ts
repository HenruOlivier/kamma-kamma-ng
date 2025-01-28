import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-input-email',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ss-input-email.component.html',
  styleUrls: ['./ss-input-email.component.scss']
})
export class SSInputEmailComponent {

  @Input() value: string = '';
  @Input() disabled: boolean = false;
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

}
