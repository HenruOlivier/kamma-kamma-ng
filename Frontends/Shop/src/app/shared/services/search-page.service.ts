import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchPageService {

  private baseUrl: string = 'http://localhost:5000/api/search';  // Updated URL for search endpoint

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    // Listen to changes in the 'q' query parameter and fetch results
    this.route.queryParams
      .pipe(
        switchMap(params => {
          const searchQuery = params['q'] || ''; // Get the 'q' parameter or default to an empty string
          return this.fetchFromSearch(searchQuery); // Fetch data with the search query
        })
      )
      .subscribe(); // Subscribe to trigger the fetch
  }

  private searchPageLoadingSubject = new BehaviorSubject<boolean>(false);
  public get searchPageLoading$(): Observable<boolean> {
    return this.searchPageLoadingSubject.asObservable();
  }

  private searchPageProductsSubject = new BehaviorSubject<any[]>([]);
  public get searchPageProducts$(): Observable<any[]> {
    return this.searchPageProductsSubject.asObservable();
  }

  private searchPageCategoriesSubject = new BehaviorSubject<any[]>([]);
  public get searchPageCategories$(): Observable<any[]> {
    return this.searchPageCategoriesSubject.asObservable();
  }

  // Fetch products and categories based on the search text
  fetchFromSearch(searchText: string): Observable<any> {
    // Clear previous results
    this.searchPageProductsSubject.next([]);
    this.searchPageCategoriesSubject.next([]);
    this.searchPageLoadingSubject.next(true);

    const url = `${this.baseUrl}?search=${encodeURIComponent(searchText)}`; // Append search text to the URL

    return this.http.get<any>(url)
      .pipe(
        tap((res) => {
          // If successful, update the local state with the fetched products and categories
          if (res.products) {
            this.searchPageProductsSubject.next(res.products);
          }
          if (res.categories) {
            this.searchPageCategoriesSubject.next(res.categories);
          }
        }),
        catchError(error => {
          // Handle the error appropriately
          console.error('Error while fetching search results:', error);

          let errorMessage = 'Error while fetching search results';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }

          // Notify failure
          return of(null);
        }),
        finalize(() => {
          this.searchPageLoadingSubject.next(false);
        })
      );
  }
}