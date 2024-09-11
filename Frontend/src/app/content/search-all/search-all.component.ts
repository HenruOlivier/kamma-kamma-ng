import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchPageService } from '../../shared/services/search-page.service';

@Component({
  selector: 'app-search-all',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-all.component.html',
  styleUrl: './search-all.component.scss'
})
export class SearchAllComponent implements OnInit {

  constructor(public searchPageService: SearchPageService) {}

  ngOnInit(): void {
    // this.fetchProducts();
  }

  // fetchFromSearch(): void {
  //   this.searchPageService.fetchFromSearch();
  // }

  onItemClick(id: string) {
    console.log('item: ', id)
  }

}