import { Component } from '@angular/core';
import { PerformanceImageComponent } from '../../shared/components/performance-image/performance-image.component';
import { FadeScale } from '../../shared/animations/FadeScale';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-functions-page',
  standalone: true,
  imports: [CommonModule, PerformanceImageComponent],
  animations: [FadeScale],
  templateUrl: './functions-page.component.html',
  styleUrl: './functions-page.component.scss'
})
export class FunctionsPageComponent {

  constructor(private router: Router) {}

  onFunctionSelected(func: string) {
    this.router.navigate(['/product-page/' + func]);
  }

}