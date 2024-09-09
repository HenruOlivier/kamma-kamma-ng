import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-search-all',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-all.component.html',
  styleUrl: './search-all.component.scss'
})
export class SearchAllComponent implements OnInit {

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
        console.log('products: ', this.products)
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

}
