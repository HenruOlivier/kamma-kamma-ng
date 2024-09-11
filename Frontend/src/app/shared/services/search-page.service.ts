import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchPageService {

  private baseUrl: string = 'http://localhost:5000/api/products';  // Adjust this URL if necessary

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    // Listen for the _searchText in the URL and fetch results when it changes
    this.route.queryParams
      .pipe(
        // Listen to changes in the `_searchText` query parameter
        switchMap(params => {
          const searchText = params['_searchText'] || ''; // Get the _searchText parameter or use empty string
          return this.fetchFromSearch(searchText); // Call fetchFromSearch with the search text
        })
      )
      .subscribe(); // Subscribe to the Observable to trigger the fetch
  }

  private searchPageLoadingSubject = new BehaviorSubject<boolean>(false);
  public get searchPageLoading$(): Observable<boolean> {
    return this.searchPageLoadingSubject.asObservable();
  }

  private searchPageItemsSubject = new BehaviorSubject<any[]>([]);
  public get searchPageItems$(): Observable<any[]> {
    return this.searchPageItemsSubject.asObservable();
  }

  // Fetch products based on the search text
  fetchFromSearch(searchText: string): Observable<any> {
    this.searchPageLoadingSubject.next(true);

    const url = `${this.baseUrl}?search=${encodeURIComponent(searchText)}`; // Append search text to the URL

    return this.http.get<any>(this.baseUrl)
    .pipe(
      tap((res) => {
        // If successful, update the local state with the fetched products
        this.searchPageItemsSubject.next(res.data);
      }),
      catchError(error => {
        // Handle the error appropriately
        console.error('Error while fetching products:', error);

        let errorMessage = 'Error while fetching products';
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

  // fetchFromSearch(searchText: string): void {
  //   this.searchPageLoadingSubject.next(true);
  //   this.http.get<any>(this.baseUrl)
  //   .pipe(
  //     tap((res) => {

  //       // const products = res.data as any[];

  //       // If successful, update the local state with the fetched products
  //       this.searchPageItemsSubject.next(res.data);

  //       // Notify success, if needed
  //       // this.notificationService.notifySuccess({message: res.message});
  //     }),
  //     catchError(error => {
  //       // Handle the error appropriately
  //       console.error('Error while fetching products:', error);

  //       let errorMessage = 'Error while fetching products';
  //       if (error.error && error.error.message) {
  //         errorMessage = error.error.message;
  //       }

  //       // Notify failure
  //       // this.notificationService.notifyError({message: errorMessage});

  //       return of(null);
  //     }),
  //     finalize(() => {
  //       this.searchPageLoadingSubject.next(false);
  //     })
  //   )
  //   .subscribe();
  // }
}