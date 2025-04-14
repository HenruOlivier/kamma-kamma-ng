import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchPageService } from '../../shared/services/search-page.service';
import { Router } from '@angular/router';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-search-all',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './search-all.component.html',
  styleUrl: './search-all.component.scss'
})
export class SearchAllComponent implements OnInit {

  constructor(
    public searchPageService: SearchPageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.fetchProducts();
  }

  // fetchFromSearch(): void {
  //   this.searchPageService.fetchFromSearch();
  // }

  onItemClick(id: string) {
    console.log('item: ', id);
    this.router.navigate(['/product-page'], { queryParams: { p: id } });
  }

  onCategoryClick(id: string) {
    console.log('category: ', id);
    this.router.navigate(['/category-page'], { queryParams: { c: id } });
  }

}