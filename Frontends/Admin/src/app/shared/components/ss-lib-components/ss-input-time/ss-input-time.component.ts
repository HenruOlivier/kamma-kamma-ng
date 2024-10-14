import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Expand } from '../../animations/expand';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-input-time',
  templateUrl: './ss-input-time.component.html',
  styleUrls: ['./ss-input-time.component.scss'],
  animations: [
    Expand,
    trigger('numberChange', [
      transition(':increment', [
        style({ transform: 'translateY(-35px)', opacity: 1 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateY(35px)', opacity: 1 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class SSInputTimeComponent {
  @Input() value: any;
  @Input() disabled: boolean = false;
  @Input() loading: Observable<boolean>;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  selectedHour: number = 0;
  selectedMinute: number = 0;

  isOpen: boolean = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.extractHourAndMinute(this.value);
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

  toggleSelect() {
    this.isOpen = !this.isOpen;
  }

  onHoursPlus() {
    if (this.selectedHour < 23) {
      this.selectedHour = this.selectedHour + 1;
    } else {
      this.selectedHour = 0;
    }

    this.setNewTime();
  }

  onHoursMinus() {
    if (this.selectedHour > 0) {
      this.selectedHour = this.selectedHour - 1;
    } else {
      this.selectedHour = 23;
    }

    this.setNewTime();
  }

  onMinutesPlus() {
    if (this.selectedMinute < 59) {
      this.selectedMinute = this.selectedMinute + 1;
    } else {
      this.selectedMinute = 0;
    }

    this.setNewTime();
  }

  onMinutesMinus() {
    if (this.selectedMinute > 0) {
      this.selectedMinute = this.selectedMinute - 1;
    } else {
      this.selectedMinute = 59;
    }

    this.setNewTime();
  }

  setNewTime() {
    const hourStr = this.selectedHour < 10 ? '0' + this.selectedHour : '' + this.selectedHour;
    const minuteStr = this.selectedMinute < 10 ? '0' + this.selectedMinute : '' + this.selectedMinute;
    const newTime = `${hourStr}:${minuteStr}`;
    this.value = newTime;
    this.valueChange.emit(newTime);
  }

  extractHourAndMinute(timeInput: Date | string) {
    let dateObj: Date;

    dateObj = new Date(timeInput);

    if (isNaN(dateObj.getTime())) {
      let stringTimeInput = timeInput as string;
      const timeParts = stringTimeInput.split(':');
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);

      const formattedHour = hours < 10 ? `0${hours}` : `${hours}`;
      const formattedMinute = minutes < 10 ? `0${minutes}` : `${minutes}`;

      this.value = `${formattedHour}:${formattedMinute}`;
      this.valueChange.emit(`${formattedHour}:${formattedMinute}`);
      this.selectedHour = Number(formattedHour);
      this.selectedMinute = Number(formattedMinute);
    } else {
      const hour = dateObj.getHours();
      const minute = dateObj.getMinutes();

      const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
      const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;

      this.value = `${formattedHour}:${formattedMinute}`;
      this.valueChange.emit(`${formattedHour}:${formattedMinute}`);
      this.selectedHour = Number(formattedHour);
      this.selectedMinute = Number(formattedMinute);
    }
  }
}
