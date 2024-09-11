import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = 'http://localhost:5000/api/products';  // Adjust this URL if necessary
  
  private currentProductLoadingSubject = new BehaviorSubject<boolean>(false);
  public get currentProductLoading$(): Observable<boolean> {
    return this.currentProductLoadingSubject.asObservable();
  }

  private currentProductSubject = new BehaviorSubject<any[]>([]);
  public get currentProduct$(): Observable<any[]> {
    return this.currentProductSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  // Fetch products based on the search text
  fetchCurrentProduct(searchText: string): Observable<any> {
    console.log('fetchFromsearch called')
    this.currentProductLoadingSubject.next(true);

    return this.http.get<any>(this.baseUrl)
    .pipe(
      tap((res) => {
        // If successful, update the local state with the fetched products
        this.currentProductSubject.next(res);
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
        this.currentProductLoadingSubject.next(false);
      })
    );
  }

  // Fetch all products from backend
  // getProducts(): Observable<any> {
  //   return this.http.get<any>(this.baseUrl);
  // }

  // Fetch all products from backend
  // getProducts(): Observable<any> {
  //   return this.http.get<any>(this.baseUrl);
  // }
}
