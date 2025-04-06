import { Component } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent {

  constructor(
    public categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    // Initialize any data or services needed for this component
  }

  // Add any methods or properties needed for this component

}
