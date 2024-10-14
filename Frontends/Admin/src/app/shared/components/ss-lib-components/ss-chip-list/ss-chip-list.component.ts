import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EnterExit } from '../../../animations/enter-exit';

@Component({
  selector: 'ss-chip-list',
  templateUrl: './ss-chip-list.component.html',
  styleUrls: ['./ss-chip-list.component.scss'],
  animations: [EnterExit]
})
export class SSChipListComponent {

  @Input() chips: any[] = [];
  @Input() displayField: any = '';

  @Output() chipRemove: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  getChipsArray(): any[] {
    return this.chips;
  }

  onChipRemove(chip: any) {
    if (typeof chip === 'string') {
      const chipIndex = this.chips.indexOf(chip);
      if (chipIndex !== -1) {
        this.chips.splice(chipIndex, 1);
      }
    }

    if (typeof chip === 'object') {
      if (this.displayField) {
        const chipIndex = this.chips.findIndex((item) => {
          return item[this.displayField] === chip[this.displayField]
        });

        if (chipIndex !== -1) {
          this.chips.splice(chipIndex, 1);
        }
      }
    }
    this.chipRemove.emit(chip);
  }
}
