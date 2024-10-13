import { Component, EventEmitter, HostListener, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from '../draggable.directive';

@Component({
  selector: 'app-keyboard-dragger',
  templateUrl: './keyboard-dragger.component.html',
  styleUrls: ['./keyboard-dragger.component.scss']
})
export class KeyboardDraggerComponent {

  @Output() mouseDown = new EventEmitter<void>();
  @Output() mouseUp = new EventEmitter<void>();

  @ViewChild('keyboardContainer', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.mouseDown.emit();
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.mouseUp.emit();
  }

}
