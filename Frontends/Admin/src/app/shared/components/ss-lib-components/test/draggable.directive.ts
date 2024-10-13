import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective {
  private startX: number | undefined;
  private startY: number | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.startX = event.clientX - this.el.nativeElement.getBoundingClientRect().left;
    this.startY = event.clientY - this.el.nativeElement.getBoundingClientRect().top;
    this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
    // this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grabbing');
    this.renderer.addClass(this.el.nativeElement, 'grabbing');
    // add other mouse event listeners here
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.startX && this.startY) {
      this.renderer.setStyle(this.el.nativeElement, 'top', event.clientY - this.startY + 'px');
      this.renderer.setStyle(this.el.nativeElement, 'left', event.clientX - this.startX + 'px');
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.startX = undefined;
    this.startY = undefined;
    // this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
    this.renderer.removeClass(this.el.nativeElement, 'grabbing');
  }
}