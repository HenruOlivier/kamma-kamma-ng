import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchPageService } from '../../shared/services/search-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-all',
  standalone: true,
  imports: [CommonModule],
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

}