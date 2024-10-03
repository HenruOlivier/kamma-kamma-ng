import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = 'http://localhost:5000/api/products/';  // Adjust this URL if necessary
  
  private currentProductLoadingSubject = new BehaviorSubject<boolean>(false);
  public get currentProductLoading$(): Observable<boolean> {
    return this.currentProductLoadingSubject.asObservable();
  }

  private currentProductErrorSubject = new BehaviorSubject<string | null>(null);
  public get currentProductError$(): Observable<string | null> {
    return this.currentProductErrorSubject.asObservable();
  }

  private currentProductSubject = new BehaviorSubject<any>(null);
  public get currentProduct$(): Observable<any> {
    return this.currentProductSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  // Fetch products based on the search text
  fetchCurrentProduct(productId: string): Observable<any> {

    this.currentProductSubject.next(null);

    this.currentProductLoadingSubject.next(true);

    this.currentProductErrorSubject.next(null);

    return this.http.get<any>(this.baseUrl + productId)
    .pipe(
      tap((res) => {
        // If successful, update the local state with the fetched products
        this.currentProductSubject.next(res);
      }),
      catchError(error => {
        // Handle the error appropriately
        console.error('Error while fetching product:', error);

        let errorMessage = 'Error while fetching product';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.currentProductErrorSubject.next(errorMessage);

        // Notify failure
        return of(null);
      }),
      finalize(() => {
        this.currentProductLoadingSubject.next(false);
      })
    );
  }

}
