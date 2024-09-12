import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core'; // Import Renderer2

@Directive({
  selector: '[toggleInViewClass]',
  standalone: true
})
export class ToggleInViewDirective implements OnInit, OnDestroy {

  private observer!: IntersectionObserver;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2 // Inject Renderer2
  ) {}

  ngOnInit(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the 'inView' class
          this.renderer.addClass(this.element.nativeElement, 'isInView');
        } else {
          // Remove the 'inView' class
          this.renderer.removeClass(this.element.nativeElement, 'isInView');
        }
      });
    }, options);

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
