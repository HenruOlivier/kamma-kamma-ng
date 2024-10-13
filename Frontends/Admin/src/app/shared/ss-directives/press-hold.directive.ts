import { Directive, Output, EventEmitter, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[pressAndHold]'
})
export class PressAndHoldDirective {
    private timeoutId: number | null = null;

    @Input() holdTime: number = 3000;

    @Output() holdTimeout: EventEmitter<void> = new EventEmitter();

    // For non-touch screens
    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent): void {
        this.startPress();
    }

    @HostListener('mouseup', ['$event'])
    @HostListener('mouseleave', ['$event'])
    clearPress(event: MouseEvent): void {
        this.stopPress();
    }

    // For touch screens
    @HostListener('touchstart', ['$event'])
    onTouchStart(event: TouchEvent): void {
        this.startPress();
    }

    @HostListener('touchend', ['$event'])
    @HostListener('touchcancel', ['$event'])
    clearTouch(event: TouchEvent): void {
        this.stopPress();
    }

    private startPress(): void {
        this.timeoutId = window.setTimeout(() => {
            this.holdTimeout.emit();
        }, this.holdTime);
    }

    private stopPress(): void {
        if (this.timeoutId !== null) {
            window.clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
}
