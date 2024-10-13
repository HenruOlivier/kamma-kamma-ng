import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = 'http://localhost:5000/api/products/';  // Adjust this URL if necessary
  
  private currentProductLoadingSubject = new BehaviorSubject<boolean>(false);
  public get currentProductLoading$(): Observable<boolean> {
    return this.currentProductLoadingSubject.asObservable();
  }

  private productsLoadingSubject = new BehaviorSubject<boolean>(false);
  public get productsLoading$(): Observable<boolean> {
    return this.productsLoadingSubject.asObservable();
  }

  private productsErrorSubject = new BehaviorSubject<string | null>(null);
  public get productsError$(): Observable<boolean> {
    return this.productsErrorSubject.asObservable();
  }

  private currentProductErrorSubject = new BehaviorSubject<string | null>(null);
  public get currentProductError$(): Observable<string | null> {
    return this.currentProductErrorSubject.asObservable();
  }

  private currentProductSubject = new BehaviorSubject<Product>(null);
  public get currentProduct$(): Observable<Product> {
    return this.currentProductSubject.asObservable();
  }

  private allProductsSubject = new BehaviorSubject<Product[]>(null);
  public get allProducts$(): Observable<Product[]> {
    return this.allProductsSubject.asObservable();
  }
  

  constructor(private http: HttpClient) {}

  refreshAllProducts(): void {
    this.fetchAllProducts().pipe(
      tap((res: Product[]) => {
        this.currentProductSubject.next(res[0]);
      }),
      catchError((error: any) => {
        console.error(error);
        return error;
      })
    ).subscribe();
  }

  // Fetch products based on the search text
  fetchAllProducts() {

    this.productsLoadingSubject.next(true);

    return this.http.get<Product[]>(this.baseUrl)
    .pipe(
      tap((res: Product[]) => {
        // If successful, update the local state with the fetched products
        // this.searchPageItemsSubject.next(res);
        this.allProductsSubject.next(res)
      }),
      catchError((error: any) => {
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
        this.productsLoadingSubject.next(false);
      })
    );
   
  }

  // Delete a product by ID
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + id);
  }

}
