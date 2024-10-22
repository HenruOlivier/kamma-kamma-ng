// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
// import { Product } from '../models/product.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductsService {

//   private baseUrl: string = 'http://localhost:5000/api/products/';  // Adjust this URL if necessary
  
//   private currentProductLoadingSubject = new BehaviorSubject<boolean>(false);
//   public get currentProductLoading$(): Observable<boolean> {
//     return this.currentProductLoadingSubject.asObservable();
//   }

//   private productsLoadingSubject = new BehaviorSubject<boolean>(false);
//   public get productsLoading$(): Observable<boolean> {
//     return this.productsLoadingSubject.asObservable();
//   }

//   private productsErrorSubject = new BehaviorSubject<string | null>(null);
//   public get productsError$(): Observable<boolean> {
//     return this.productsErrorSubject.asObservable();
//   }

//   private currentProductErrorSubject = new BehaviorSubject<string | null>(null);
//   public get currentProductError$(): Observable<string | null> {
//     return this.currentProductErrorSubject.asObservable();
//   }

//   private currentProductSubject = new BehaviorSubject<Product>(null);
//   public get currentProduct$(): Observable<Product> {
//     return this.currentProductSubject.asObservable();
//   }

//   private allProductsSubject = new BehaviorSubject<Product[]>(null);
//   public get allProducts$(): Observable<Product[]> {
//     return this.allProductsSubject.asObservable();
//   }
  

//   constructor(private http: HttpClient) {}

//   refreshAllProducts(): void {
//     this.fetchAllProducts().pipe(
//       tap((res: Product[]) => {
//         this.currentProductSubject.next(res[0]);
//       }),
//       catchError((error: any) => {
//         console.error(error);
//         return error;
//       })
//     ).subscribe();
//   }

//   // Fetch products based on the search text
//   fetchAllProducts() {

//     this.productsLoadingSubject.next(true);

//     return this.http.get<Product[]>(this.baseUrl)
//     .pipe(
//       tap((res: Product[]) => {
//         // If successful, update the local state with the fetched products
//         // this.searchPageItemsSubject.next(res);
//         this.allProductsSubject.next(res)
//       }),
//       catchError((error: any) => {
//         // Handle the error appropriately
//         console.error('Error while fetching products:', error);

//         let errorMessage = 'Error while fetching products';
//         if (error.error && error.error.message) {
//           errorMessage = error.error.message;
//         }

//         // Notify failure
//         return of(null);
//       }),
//       finalize(() => {
//         this.productsLoadingSubject.next(false);
//       })
//     );
   
//   }

//   // Delete a product by ID
//   deleteProduct(id: number): Observable<void> {
//     return this.http.delete<void>(this.baseUrl + id);
//   }

// }


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

  private currentProductSubject = new BehaviorSubject<Product | null>(null);
  public get currentProduct$(): Observable<Product | null> {
    return this.currentProductSubject.asObservable();
  }

  private allProductsSubject = new BehaviorSubject<Product[] | null>(null);
  public get allProducts$(): Observable<Product[] | null> {
    return this.allProductsSubject.asObservable();
  }

  private singleUpdateLoadingSubject = new BehaviorSubject<boolean>(false);
  public get singleUpdateLoading$(): Observable<boolean> {
    return this.singleUpdateLoadingSubject.asObservable();
  }

  private createUpdateErrSubject = new BehaviorSubject<string | null>(null);
  public get createUpdateErr$(): Observable<string | null> {
    return this.createUpdateErrSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  // Fetch all products
  refreshAllProducts(): void {
    this.fetchAllProducts().pipe(
      tap((res: Product[]) => {
        if (res && res.length > 0) {
          this.currentProductSubject.next(res[0]);
        }
      }),
      catchError((error: any) => {
        console.error(error);
        return of(error);
      })
    ).subscribe();
  }

  // Fetch products from the API
  fetchAllProducts(): Observable<Product[]> {
    this.productsLoadingSubject.next(true);
    
    return this.http.get<Product[]>(this.baseUrl)
      .pipe(
        tap((res: Product[]) => {
          this.allProductsSubject.next(res);
        }),
        catchError((error: any) => {
          console.error('Error while fetching products:', error);
          this.productsErrorSubject.next('Error while fetching products');
          return of([]);
        }),
        finalize(() => {
          this.productsLoadingSubject.next(false);
        })
      );
  }

  // Fetch a product by ID
  fetchProductById(productId: string): Observable<Product | null> {
    this.currentProductLoadingSubject.next(true);
    return this.http.get<Product>(`${this.baseUrl}${productId}`)
      .pipe(
        tap((res: Product) => {
          this.currentProductSubject.next(res);
        }),
        catchError((error: any) => {
          console.error('Error while fetching product:', error);
          this.currentProductErrorSubject.next('Error while fetching product');
          return of(null);
        }),
        finalize(() => {
          this.currentProductLoadingSubject.next(false);
        })
      )
  }

  // Add a new product
  addProduct(product: Product): Observable<Product | null> {
    this.productsLoadingSubject.next(true);
    this.singleUpdateLoadingSubject.next(true);
    this.createUpdateErrSubject.next(null);

    return this.http.post<Product>(this.baseUrl, product)
      .pipe(
        tap((res: Product) => {
          this.allProductsSubject.next([...(this.allProductsSubject.value || []), res]);
        }),
        catchError((error: any) => {
          console.error('Error while adding product:', error);
          this.createUpdateErrSubject.next('Error while adding product');
          return of(null);
        }),
        finalize(() => {
          this.productsLoadingSubject.next(false);
          this.singleUpdateLoadingSubject.next(false);
        })
      );
  }

  // Update an existing product by ID
  updateProduct(productId: string, updatedProduct: Product): Observable<Product | null> {
    this.currentProductLoadingSubject.next(true);
    this.singleUpdateLoadingSubject.next(true);
    this.createUpdateErrSubject.next(null);

    return this.http.put<Product>(`${this.baseUrl}${productId}`, updatedProduct)
      .pipe(
        tap((res: Product) => {
          // Update the current product if it's the one being updated
          if (this.currentProductSubject.value?.id === productId) {
            this.currentProductSubject.next(res);
          }

          // Update the product in the product list
          const currentProducts = this.allProductsSubject.value;
          if (currentProducts && currentProducts.length > 0) {
            const updatedProducts = currentProducts.map((p: Product) =>
              p._id === productId ? res : p
            );
            this.allProductsSubject.next(updatedProducts || []);
          }
        }),
        catchError((error: any) => {
          console.error('Error while updating product:', error);
          this.createUpdateErrSubject.next('Error while updating product');
          return of(null);
        }),
        finalize(() => {
          this.currentProductLoadingSubject.next(false);
          this.singleUpdateLoadingSubject.next(false);
        })
      );
  }

  // Delete a product by ID
  deleteProduct(productId: string): Observable<boolean> {
    this.productsLoadingSubject.next(true);

    return this.http.delete<void>(`${this.baseUrl}${productId}`)
      .pipe(
        tap(() => {

          // Remove the product from the product list
          const currentProducts = this.allProductsSubject.value;
          if (currentProducts && currentProducts.length > 0) {
            const updatedProducts = currentProducts.filter((p : Product) => p._id !== productId);
            this.allProductsSubject.next(updatedProducts || []);
          }

        }),
        catchError((error: any) => {
          console.error('Error while deleting product:', error);
          this.productsErrorSubject.next('Error while deleting product');
          return of(false);
        }),
        finalize(() => {
          this.productsLoadingSubject.next(false);
        })
      );
  }
}