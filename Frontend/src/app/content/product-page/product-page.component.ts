import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
     // Listen to changes in the 'q' query parameter and fetch results
     this.route.queryParams
     .pipe(
       // Listen to changes in the `q` query parameter
       switchMap(params => {
         const searchQuery = params['p'] || ''; // Get the 'q' parameter or default to an empty string
         return this.productService.fetchCurrentProduct(searchQuery); // Fetch data with the search query
       })
     )
     .subscribe(); // Subscribe to trigger the fetch
  }

}
