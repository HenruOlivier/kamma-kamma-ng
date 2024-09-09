import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search-all',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './search-all.component.html',
  styleUrl: './search-all.component.scss'
})
export class SearchAllComponent {

  constructor(private productsService: ProductsService) {}

  options: string[] = ['awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa','awe', 'jaaaaa',];

  products: any[] = [];

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productsService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

}
