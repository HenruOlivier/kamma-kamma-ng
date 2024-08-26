import { Component, OnInit, Renderer2 } from '@angular/core';
import { AddInViewOnceDirective } from '../../shared/directives/addInViewOnce';
import { TypingEffectDirective } from '../../shared/directives/typingEffect';
import { ToggleInViewDirective } from '../../shared/directives/toggleInViewClass';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [CommonModule, AddInViewOnceDirective, TypingEffectDirective, ToggleInViewDirective],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss'
})
export class IntroPageComponent implements OnInit{

  copied: boolean = false;

  private scrollPosition = 0;
  private isScrolling = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.listen('window', 'scroll', this.onScroll.bind(this));
    this.animateLines();
  }

  // onScroll() {
  //   const scrollPosition = window.scrollY;

  //   const lines = document.querySelectorAll('.scene__line');
  //   lines.forEach((line, index) => {
  //     const lineElement = line as HTMLElement;
      
  //     // Get the original rotation from the CSS custom property
  //     const originalRotation = lineElement.style.getPropertyValue('--rotate');
  //     const newRotation = parseFloat(originalRotation) + scrollPosition * 0.5; // Adjust rotation based on scroll

  //     // Combine the translateY effect with the rotation
  //     this.renderer.setStyle(lineElement, 'transform', 
  //       `rotate(${newRotation}deg)`);
  //   });
  // }

  onScroll() {
    this.scrollPosition = window.scrollY;
    this.isScrolling = true;
  }

  animateLines() {
    const lines = document.querySelectorAll('.scene__line');
    lines.forEach((line, index) => {
      const lineElement = line as HTMLElement;
      const originalRotation = parseFloat(lineElement.style.getPropertyValue('--rotate')) || 0;
      let newRotation = originalRotation + this.scrollPosition * 0.5; // Adjust rotation based on scroll

      if (this.isScrolling) {
        this.renderer.setStyle(lineElement, 'transform', `rotate(${newRotation}deg)`);
      } else {
        newRotation += 0.01; // Normal rotation speed when not scrolling
        this.renderer.setStyle(lineElement, 'transform', `rotate(${newRotation}deg)`);
      }
    });

    this.isScrolling = false;
    requestAnimationFrame(this.animateLines.bind(this));
  }

  copyNumber() {
    const phoneNumber = '+27 82 828 9723';
    navigator.clipboard.writeText(phoneNumber)
        .then(() => {
            console.log('Phone number copied to clipboard');
            this.copied = true;
            setTimeout(() => {
              this.copied = false;
            }, 3000);
        })
        .catch(err => {
            console.error('Could not copy phone number: ', err);
        });
  }

  onCvClick() {
    window.open('assets/HenruOlivier-CV.pdf', '_blank');
  }


}