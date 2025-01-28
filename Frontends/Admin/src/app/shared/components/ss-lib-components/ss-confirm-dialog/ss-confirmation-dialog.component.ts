import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ss-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ss-confirmation-dialog.component.html',
  styleUrls: ['./ss-confirmation-dialog.component.scss']
})
export class SSConfirmationDialogComponent implements OnInit {

  @ViewChild('dialogElementRef') confirmationDialog!: ElementRef;

  backdrop: boolean = false;

  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @Input() hasBackdrop: boolean = true;
  @Input() messageHeader: string = 'Are you sure?';
  @Input() message: string = 'This action cannot be undone, do you want to proceed?';
  @Input() buttonConfirm: string = 'Confirm';
  @Input() buttonCancel: string = 'Cancel';

  private _closePageDialog = false;

  @Input()
  set isOpen(value: boolean) {
    this._closePageDialog = value;
    if (value) {
      this.openDialog();
    } else {
      this.closeDialog();
    }
  }

  get closePageOverlay(): boolean {
    return this._closePageDialog;
  }


  constructor(
    private eRef: ElementRef,
  ) { }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

  openDialog(){
    this.confirmationDialog.nativeElement.showModal();
    this.confirmationDialog.nativeElement.classList.add('dialog-open');
    this.backdrop = true;
  }

  closeDialog(){
    if (!this.confirmationDialog) return;
    this.backdrop = false;
    this.confirmationDialog.nativeElement.classList.remove('dialog-open');
    setTimeout(() => {
    this.confirmationDialog.nativeElement.close();
    }, 150);
  }

  // @HostListener('document:click', ['$event'])
  // clickout(event: MouseEvent) {
  //   console.log('clicked outside')
  //   if (this.eRef.nativeElement.contains(event.target)) {
  //     // this.onCancel();
  //     console.log('clicked inside')
  //   }
  // }

}
