import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChange, ViewChild } from '@angular/core';
import { DialogExitType } from './dialogExitTypes.model';
import { DialogType } from './dialogType.model';
import { DialogExitValues } from './dialogExitValues.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ss-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ss-dialog.component.html',
  styleUrls: ['./ss-dialog.component.scss']
})
export class SSDialogComponent implements OnChanges {
  DialogExitType = DialogExitType;

  @ViewChild('dialogElementRef') confirmationDialog: ElementRef = new ElementRef(null);

  backdrop: boolean = false;

  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() ok = new EventEmitter();
  @Output() outsideClick = new EventEmitter();
  @Output() dismiss = new EventEmitter();
  @Output() timeExit = new EventEmitter();
  @Output() exitCross = new EventEmitter();

  @Output() isOpenChange = new EventEmitter<boolean>();

  @Input() hasBackdrop: boolean = true;
  @Input() dialogType: DialogType = DialogType.ALERT;
  @Input() dialogExitType: DialogExitValues[] | null = null //[{ type: DialogExitType.DISMISS, text: 'DISMISS', classList: 'ss-btn-danger' }];
  @Input() outsideClickToExit: boolean = false;
  @Input() hasExitCross: boolean = false;
  @Input() yAxisPosition: string = 'center';
  @Input() xAxisPosition: string = 'center';
  @Input() isOpen: boolean = false;
  @Input() timeToExit: number = 0;
  @Input() width: string = '400px';
  @Input() height: string = 'auto';
  @Input() fullScreen: boolean = false;

  constructor(private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    if (this.isOpen) {
      this.openDialog();
    } else {
      this.closeDialog();
    }
  }

  ngOnChanges(changes: { isOpen: SimpleChange } | any) {
    if (changes.isOpen) {
      this.toggleDialog();
    }
  }

  toggleDialog() {
    if (this.confirmationDialog && this.confirmationDialog.nativeElement) {
      if (this.isOpen) {
        this.openDialog();
      } else {
        this.closeDialog();
      }

      if (this.timeToExit > 0) {
        setTimeout(() => {
          this.closeDialog();
          setTimeout(() => {
            this.timeExit.emit();
          }, 150);
        }, this.timeToExit);
      }

      this.cdr.detectChanges();
    }
  }

  openDialog() {
    this.confirmationDialog.nativeElement.showModal();

    this.confirmationDialog.nativeElement.classList.add('dialog-open');
    this.backdrop = true;
    this.isOpen = true;
    this.isOpenChange.emit(this.isOpen)
  }

  closeDialog() {
    if (!this.confirmationDialog) return;

    this.confirmationDialog.nativeElement.classList.remove('dialog-open');
    this.backdrop = false;
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen)

    setTimeout(() => {
      this.confirmationDialog.nativeElement.close();
    }, 150);
  }

  onConfirm(): void {
    this.confirm.emit();
    this.closeDialog();
  }

  onCancel(): void {
    this.cancel.emit();
    this.closeDialog();
  }

  onOk(): void {
    this.ok.emit();
    this.closeDialog();
  }

  onDismiss(): void {
    this.dismiss.emit();
    this.closeDialog();
  }

  onExitCross(): void {
    this.exitCross.emit();
    this.closeDialog();
  }

  onBackdropClick() {
    if (this.outsideClickToExit) {
      this.closeDialog();
    }
  }
}
