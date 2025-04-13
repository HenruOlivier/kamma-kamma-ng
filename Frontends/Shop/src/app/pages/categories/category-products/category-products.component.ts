import { Component } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { TypingEffectDirective } from '../../../shared/directives/typingEffect';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, TypingEffectDirective],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent {

  _id: string | null = null;

  constructor(
    public categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
    this._id = this.activatedRoute.snapshot.params['id'] || null;

    if (this._id) {
      this.categoriesService.fetchProductsByCategory(this._id);
    } else {
      console.error('No category ID provided in the route.');
    }

  }

  // Add any methods or properties needed for this component

}
