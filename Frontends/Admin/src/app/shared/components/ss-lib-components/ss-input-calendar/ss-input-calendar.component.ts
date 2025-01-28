import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { Expand } from '../../../animations/expand';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SSDialogComponent } from '../ss-dialog/ss-dialog.component';

export interface CalenderValues {
  year: number;
  month: number;
  day: number;
}

export enum CalenderType {
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day'
}

@Component({
  selector: 'ss-input-calendar',
  standalone: true,
  imports: [CommonModule, SSDialogComponent, FormsModule],
  templateUrl: './ss-input-calendar.component.html',
  styleUrls: ['./ss-input-calendar.component.scss'],
  animations: [Expand]
})
export class SSInputCalendarComponent {

  @Input() value: Date | null = null;

  @Input() loading: Observable<boolean>;

  @Output() valueChange: EventEmitter<Date | null> = new EventEmitter<Date | null>();

  @Input() disabled: boolean = false;

  displayValue: any = 'dd/mm/yyyy';

  isOpen: boolean = false;

  calenderType = CalenderType;

  currentValueOpen: CalenderType = CalenderType.DAY;

  days: number[] = [...Array(31).keys()].map(i => i + 1);

  displayedDays: { day: number, isCurrentMonth: boolean }[] = [...Array(31).keys()].map(i => ({ day: i + 1, isCurrentMonth: true }));
  months: number[] = [...Array(12).keys()].map(i => i + 1);
  years: number[] = [...Array(100).keys()].map(i => i + 1950);

  monthsString: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  currentYearRange: number[] = [...Array(10).keys()].map(i => i + 2020);

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  currentDay = new Date().getDate();

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  selectedDay: number = new Date().getDate();

  yearOptionsOpen: boolean = false;
  monthOptionsOpen: boolean = false;
  dayOptionsOpen: boolean = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.days = this.getDaysInMonth(this.currentYear, this.currentMonth);
    this.displayedDays = this.getDisplayedDays(this.currentYear, this.currentMonth);
  }

  writeValue(value: any): void {
    this.value = value;

    if (value !== null) {
      this.currentYear = new Date(value).getFullYear();
      this.currentMonth = new Date(value).getMonth() + 1;
      this.currentDay = new Date(value).getDate();

      this.selectedYear = new Date(value).getFullYear();
      this.selectedMonth = new Date(value).getMonth() + 1;
      this.selectedDay = new Date(value).getDate();

      this.displayValue = this.selectedDay + '/' + this.selectedMonth + '/' + this.selectedYear;
    }
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

  toggleCalendar() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.yearOptionsOpen = false;
      this.monthOptionsOpen = false;
      this.dayOptionsOpen = false;
    }
    if (this.isOpen) {
      this.dayOptionsOpen = true;
      this.currentValueOpen = CalenderType.DAY;
    }
  }

  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  getDaysInMonth(year: number, month: number): number[] {
    if (month === 0) { // Previous December if month is January
      year -= 1;
      month = 12;
    }

    const days = new Date(year, month, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  }

  getDisplayedDays(year: number, month: number): { day: number, isCurrentMonth: boolean }[] {
    const firstDay = this.getFirstDayOfMonth(year, month);

    // Adjustments for previous month calculations
    let prevYear = month - 1 === 0 ? year - 1 : year;
    let prevMonth = month - 1 === 0 ? 12 : month - 1;

    // Find number of days in previous month
    const previousMonthDays = this.getDaysInMonth(prevYear, prevMonth);

    // Extract the last few days of the previous month based on the firstDay
    const lastDaysOfPrevMonth = firstDay === 0 ? [] : previousMonthDays.slice(-firstDay);

    const daysInCurrentMonth = this.getDaysInMonth(year, month);

    const lastDaysOfPrevMonthFormatted = lastDaysOfPrevMonth.map(day => ({ day, isCurrentMonth: false }));
    const daysInCurrentMonthFormatted = daysInCurrentMonth.map(day => ({ day, isCurrentMonth: true }));

    return [...lastDaysOfPrevMonthFormatted, ...daysInCurrentMonthFormatted];
  }

  getFirstDayOfMonth(year: number, month: number): number {
    const date = new Date(year, month - 1, 1);
    return date.getDay(); // 0 = Sunday, 1 = Monday, ... , 6 = Saturday
  }

  selectYear(data: number): void {
    this.currentYear = data;
    this.days = this.getDaysInMonth(this.currentYear, this.currentMonth);
    this.yearOptionsOpen = false;
    this.displayedDays = this.getDisplayedDays(this.currentYear, this.currentMonth);
    if (this.dayOptionsOpen) {
      this.currentValueOpen = CalenderType.DAY;
    }
    if (this.monthOptionsOpen) {
      this.currentValueOpen = CalenderType.MONTH;
    }
  }

  selectMonth(data: number): void {
    this.currentMonth = data;
    this.selectedYear = this.currentYear;
    this.days = this.getDaysInMonth(this.currentYear, this.currentMonth);
    this.monthOptionsOpen = false;
    this.displayedDays = this.getDisplayedDays(this.currentYear, this.currentMonth);
    if (this.dayOptionsOpen) {
      this.currentValueOpen = CalenderType.DAY;
    };
    if (this.yearOptionsOpen) {
      this.currentValueOpen = CalenderType.YEAR;
    }
  }

  selectDay(data: number): void {
    this.currentDay = data;
    this.selectedDay = data;
    this.selectedYear = this.currentYear;
    this.selectedMonth = this.currentMonth;
    this.dayOptionsOpen = false;

    let newDate = new Date(this.selectedYear + '/' + this.selectedMonth + '/' + this.selectedDay);
    this.value = newDate;
    this.valueChange.emit(this.value);
    this.displayValue = this.selectedDay + '/' + this.selectedMonth + '/' + this.selectedYear;
    setTimeout(() => { this.toggleCalendar(); }, 80);
  }

  previousMonth(): void {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.days = this.getDaysInMonth(this.currentYear, this.currentMonth);
    if (this.getDaysInMonth(this.currentYear, this.currentMonth).length < this.currentDay) {
      this.currentDay = this.getDaysInMonth(this.currentYear, this.currentMonth).length;
    }
    this.displayedDays = this.getDisplayedDays(this.currentYear, this.currentMonth);
  }

  nextMonth(): void {
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.days = this.getDaysInMonth(this.currentYear, this.currentMonth);
    if (this.getDaysInMonth(this.currentYear, this.currentMonth).length < this.currentDay) {
      this.currentDay = this.getDaysInMonth(this.currentYear, this.currentMonth).length;
    }
    this.displayedDays = this.getDisplayedDays(this.currentYear, this.currentMonth);
  }

  previousYear(): void {
    this.currentYear--;
    this.days = this.getDaysInMonth(this.currentYear, this.currentMonth);
    if (this.currentYear < this.currentYearRange[0]) {
      this.previousTenYears();
    }
    this.displayedDays = this.getDisplayedDays(this.currentYear, this.currentMonth);
  }

  nextYear(): void {
    this.currentYear++;
    this.days = this.getDaysInMonth(this.currentYear, this.currentMonth);
    if (this.currentYear > this.currentYearRange[this.currentYearRange.length - 1]) {
      this.nextTenYears();
    }
    this.displayedDays = this.getDisplayedDays(this.currentYear, this.currentMonth);
  }

  nextTenYears(): void {
    this.currentYearRange = this.currentYearRange.map(i => i + 10);
  }

  previousTenYears(): void {
    this.currentYearRange = this.currentYearRange.map(i => i - 10);
  }

  changeMonth(): void {
    this.currentValueOpen = CalenderType.MONTH;
    this.monthOptionsOpen = true;
  }

  changeYear(): void {
    this.currentValueOpen = CalenderType.YEAR;
    this.yearOptionsOpen = true;
  }
}
