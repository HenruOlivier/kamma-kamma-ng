import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { ProductVariation } from '../../models/productVariation.model';

@Injectable({
  providedIn: 'root'
})
export class VariationsService {

  private baseUrl: string = 'http://localhost:5000/api/variations/';  // Adjust this URL if necessary

  private variationsLoadingSubject = new BehaviorSubject<boolean>(false);
  public get variationsLoading$(): Observable<boolean> {
    return this.variationsLoadingSubject.asObservable();
  }

  private variationsErrorSubject = new BehaviorSubject<string | null>(null);
  public get variationsError$(): Observable<string | null> {
    return this.variationsErrorSubject.asObservable();
  }

  private currentVariationSubject = new BehaviorSubject<ProductVariation | null>(null);
  public get currentVariation$(): Observable<ProductVariation | null> {
    return this.currentVariationSubject.asObservable();
  }

  private allVariationsSubject = new BehaviorSubject<ProductVariation[] | null>(null);
  public get allVariations$(): Observable<ProductVariation[] | null> {
    return this.allVariationsSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  // Fetch all variations
  fetchAllVariations(): Observable<ProductVariation[]> {
    this.variationsLoadingSubject.next(true);
    return this.http.get<ProductVariation[]>(this.baseUrl)
      .pipe(
        tap((variations: ProductVariation[]) => {
          this.allVariationsSubject.next(variations);
        }),
        catchError((error: any) => {
          console.error('Error while fetching variations:', error);
          this.variationsErrorSubject.next('Error while fetching variations');
          return of([]);
        }),
        finalize(() => {
          this.variationsLoadingSubject.next(false);
        })
      );
  }

  // Fetch a variation by ID
  fetchVariationById(variationId: string): Observable<ProductVariation | null> {
    return this.http.get<ProductVariation>(`${this.baseUrl}${variationId}`)
      .pipe(
        tap((variation: ProductVariation) => {
          this.currentVariationSubject.next(variation);
        }),
        catchError((error: any) => {
          console.error('Error while fetching variation:', error);
          return of(null);
        })
      );
  }

  // Add a new variation
  addVariation(variation: ProductVariation): Observable<ProductVariation | null> {
    return this.http.post<ProductVariation>(this.baseUrl, variation)
      .pipe(
        tap((newVariation: ProductVariation) => {
          this.allVariationsSubject.next([...(this.allVariationsSubject.value || []), newVariation]);
        }),
        catchError((error: any) => {
          console.error('Error while adding variation:', error);
          return of(null);
        })
      );
  }

  // Update an existing variation by ID
  updateVariation(variationId: string, updatedVariation: ProductVariation): Observable<ProductVariation | null> {
    return this.http.put<ProductVariation>(`${this.baseUrl}${variationId}`, updatedVariation)
      .pipe(
        tap((res: ProductVariation) => {
          const currentVariations = this.allVariationsSubject.value;
          if (currentVariations && currentVariations.length > 0) {
            const updatedVariations = currentVariations.map((v: ProductVariation) =>
              v._id === variationId ? res : v
            );
            this.allVariationsSubject.next(updatedVariations || []);
          }
        }),
        catchError((error: any) => {
          console.error('Error while updating variation:', error);
          return of(null);
        })
      );
  }

  // Delete a variation by ID
  deleteVariation(variationId: string): Observable<boolean> {
    return this.http.delete<void>(`${this.baseUrl}${variationId}`)
      .pipe(
        tap(() => {
          const currentVariations = this.allVariationsSubject.value;
          if (currentVariations && currentVariations.length > 0) {
            const updatedVariations = currentVariations.filter((v: ProductVariation) => v._id !== variationId);
            this.allVariationsSubject.next(updatedVariations || []);
          }
        }),
        catchError((error: any) => {
          console.error('Error while deleting variation:', error);
          return of(false);
        })
      );
  }
}