import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environment/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product | null = null;

  baseImgUrl = environment.baseImageUrl;

  constructor(
    private router: Router,
  ) { }

  productClicked(product: Product): void {
    console.log('Product clicked:', product);
    // go to product route
    this.router.navigate(['/product-page'], { queryParams: { p: product._id } });
  }

  addToCart(product: Product): void {
    console.log('Add to cart:', product);
    // Handle add-to-cart logic here
  }
}
