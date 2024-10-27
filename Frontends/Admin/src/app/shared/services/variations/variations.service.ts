// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
// import { ProductVariation } from '../../models/productVariation.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class VariationsService {

//   private baseUrl: string = 'http://localhost:5000/api/variations/';  // Adjust this URL if necessary

//   private variationsLoadingSubject = new BehaviorSubject<boolean>(false);
//   public get variationsLoading$(): Observable<boolean> {
//     return this.variationsLoadingSubject.asObservable();
//   }

//   private variationLoadingSubject = new BehaviorSubject<boolean>(false);
//   public get variationLoading$(): Observable<boolean> {
//     return this.variationLoadingSubject.asObservable();
//   }

//   private variationsErrorSubject = new BehaviorSubject<string | null>(null);
//   public get variationsError$(): Observable<string | null> {
//     return this.variationsErrorSubject.asObservable();
//   }

//   private currentVariationErrorSubject = new BehaviorSubject<string | null>(null);
//   public get currentVariationError$(): Observable<string | null> {
//     return this.currentVariationErrorSubject.asObservable();
//   }

//   private currentVariationSubject = new BehaviorSubject<ProductVariation | null>(null);
//   public get currentVariation$(): Observable<ProductVariation | null> {
//     return this.currentVariationSubject.asObservable();
//   }

//   private allVariationsSubject = new BehaviorSubject<ProductVariation[] | null>(null);
//   public get allVariations$(): Observable<ProductVariation[] | null> {
//     return this.allVariationsSubject.asObservable();
//   }

//   private singleUpdateLoadingSubject = new BehaviorSubject<boolean>(false);
//   public get singleUpdateLoading$(): Observable<boolean> {
//     return this.singleUpdateLoadingSubject.asObservable();
//   }

//   private createUpdateErrSubject = new BehaviorSubject<string | null>(null);
//   public get createUpdateErr$(): Observable<string | null> {
//     return this.createUpdateErrSubject.asObservable();
//   }

//   constructor(private http: HttpClient) {}

//   // Fetch all variations
//   refreshAllVariations(): void {
//     this.fetchAllVariations().pipe(
//       tap((res: ProductVariation[]) => {
//         if (res && res.length > 0) {
//           this.currentVariationSubject.next(res[0]);
//         }
//       }),
//       catchError((error: any) => {
//         console.error(error);
//         return of(error);
//       })
//     ).subscribe();
//   }

//   fetchAllVariations(): Observable<ProductVariation[]> {
//     this.variationsLoadingSubject.next(true);

//     return this.http.get<ProductVariation[]>(this.baseUrl)
//       .pipe(
//         tap((variations: ProductVariation[]) => {
//           this.allVariationsSubject.next(variations);
//         }),
//         catchError((error: any) => {
//           console.error('Error while fetching variations:', error);
//           this.variationsErrorSubject.next('Error while fetching variations');
//           return of([]);
//         }),
//         finalize(() => {
//           this.variationsLoadingSubject.next(false);
//         })
//       );
//   }

//   // Fetch a variation by ID
//   fetchVariationById(variationId: string): Observable<ProductVariation | null> {
//     this.variationLoadingSubject.next(true);
//     return this.http.get<ProductVariation>(`${this.baseUrl}${variationId}`)
//       .pipe(
//         tap((variation: ProductVariation) => {
//           this.currentVariationSubject.next(variation);
//         }),
//         catchError((error: any) => {
//           console.error('Error while fetching variation:', error);
//           this.currentVariationErrorSubject.next('Error while fetching variation');
//           return of(null);
//         }),
//         finalize(() => {
//           this.variationLoadingSubject.next(false);
//         })
//       );
//   }

//   // Add a new variation
//   addVariation(variation: ProductVariation): Observable<ProductVariation | null> {
//     this.variationsLoadingSubject.next(true);
//     this.singleUpdateLoadingSubject.next(true);
//     this.createUpdateErrSubject.next(null);

//     return this.http.post<ProductVariation>(this.baseUrl, variation)
//       .pipe(
//         tap((newVariation: ProductVariation) => {
//           this.allVariationsSubject.next([...(this.allVariationsSubject.value || []), newVariation]);
//         }),
//         catchError((error: any) => {
//           console.error('Error while adding variation:', error);
//           this.createUpdateErrSubject.next('Error while adding variation');
//           return of(null);
//         }),
//         finalize(() => {
//           this.variationsLoadingSubject.next(false);
//           this.singleUpdateLoadingSubject.next(false);
//         })
//       );
//   }

//   // Update an existing variation by ID
//   updateVariation(variationId: string, updatedVariation: ProductVariation): Observable<ProductVariation | null> {
//     this.variationLoadingSubject.next(true);
//     this.singleUpdateLoadingSubject.next(true);
//     this.createUpdateErrSubject.next(null);

//     return this.http.put<ProductVariation>(`${this.baseUrl}${variationId}`, updatedVariation)
//       .pipe(
//         tap((res: ProductVariation) => {
//           // Update the current variation if it's the one being updated
//           if (this.currentVariationSubject.value?._id === variationId) {
//             this.currentVariationSubject.next(res);
//           }

//           // Update the variation in the variation list
//           const currentVariations = this.allVariationsSubject.value;
//           if (currentVariations && currentVariations.length > 0) {
//             const updatedVariations = currentVariations.map((v: ProductVariation) =>
//               v._id === variationId ? res : v
//             );
//             this.allVariationsSubject.next(updatedVariations || []);
//           }
//         }),
//         catchError((error: any) => {
//           console.error('Error while updating variation:', error);
//           this.createUpdateErrSubject.next('Error while updating variation');
//           return of(null);
//         }),
//         finalize(() => {
//           this.variationLoadingSubject.next(false);
//           this.singleUpdateLoadingSubject.next(false);
//         })
//       );
//   }

//   // Delete a variation by ID
//   deleteVariation(variationId: string): Observable<boolean> {
//     this.variationsLoadingSubject.next(true);

//     return this.http.delete<void>(`${this.baseUrl}${variationId}`)
//       .pipe(
//         tap(() => {
//           // Remove the variation from the variation list
//           const currentVariations = this.allVariationsSubject.value;
//           if (currentVariations && currentVariations.length > 0) {
//             const updatedVariations = currentVariations.filter((v: ProductVariation) => v._id !== variationId);
//             this.allVariationsSubject.next(updatedVariations || []);
//           }
//         }),
//         catchError((error: any) => {
//           console.error('Error while deleting variation:', error);
//           this.variationsErrorSubject.next('Error while deleting variation');
//           return of(false);
//         }),
//         finalize(() => {
//           this.variationsLoadingSubject.next(false);
//         })
//       );
//   }
// }