import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  searchQuery: string = '';  // Hold the search query

  constructor(private router: Router) {}

  // Method to handle the keydown event
  onSearchKeyDown(event: KeyboardEvent) {
    // console.log('keyyy ', event)
    if (event.key === 'Enter') {
      // Navigate to the /search route, optionally with query parameters
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      // this.router.navigate([`/search/${this.searchQuery}`]);
    }
  }

}
