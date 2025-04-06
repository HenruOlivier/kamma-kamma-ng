import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl: string = 'http://localhost:5000/api/categories/';  // Adjust this URL if necessary

  private categoriesLoadingSubject = new BehaviorSubject<boolean>(false);
  public get categoriesLoading$(): Observable<boolean> {
    return this.categoriesLoadingSubject.asObservable();
  }

  private categoryLoadingSubject = new BehaviorSubject<boolean>(false);
  public get categoryLoading$(): Observable<boolean> {
    return this.categoryLoadingSubject.asObservable();
  }

  private categoriesErrorSubject = new BehaviorSubject<string | null>(null);
  public get categoriesError$(): Observable<string | null> {
    return this.categoriesErrorSubject.asObservable();
  }

  private currentCategoryErrorSubject = new BehaviorSubject<string | null>(null);
  public get currentCategoryError$(): Observable<string | null> {
    return this.currentCategoryErrorSubject.asObservable();
  }

  private currentCategorySubject = new BehaviorSubject<Category | null>(null);
  public get currentCategory$(): Observable<Category | null> {
    return this.currentCategorySubject.asObservable();
  }

  private allCategoriesSubject = new BehaviorSubject<Category[] | null>(null);
  public get allCategories$(): Observable<Category[] | null> {
    return this.allCategoriesSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  // Fetch all categories
  refreshAllCategories(): void {
    this.fetchAllCategories().pipe(
      tap((res: Category[]) => {
        if (res && res.length > 0) {
          this.currentCategorySubject.next(res[0]);
        }
      }),
      catchError((error: any) => {
        console.error(error);
        return of(error);
      })
    ).subscribe();
  }

  // Fetch categories from the API
  fetchAllCategories(): Observable<Category[]> {
    console.log('fetch all cat')
    this.categoriesLoadingSubject.next(true);

    return this.http.get<Category[]>(this.baseUrl)
      .pipe(
        tap((categories: Category[]) => {
          console.log('awe')
          this.allCategoriesSubject.next(categories);
        }),
        catchError((error: any) => {
          console.error('Error while fetching categories:', error);
          this.categoriesErrorSubject.next('Error while fetching categories');
          return of([]);
        }),
        finalize(() => {
          console.log('awe')
          this.categoriesLoadingSubject.next(false);
        })
      );
  }

  // Fetch a category by ID
  fetchCategoryById(categoryId: string): Observable<Category | null> {
    this.categoryLoadingSubject.next(true);
    return this.http.get<Category>(`${this.baseUrl}${categoryId}`)
      .pipe(
        tap((category: Category) => {
          this.currentCategorySubject.next(category);
        }),
        catchError((error: any) => {
          console.error('Error while fetching category:', error);
          this.currentCategoryErrorSubject.next('Error while fetching category');
          return of(null);
        }),
        finalize(() => {
          this.categoryLoadingSubject.next(false);
        })
      );
  }

}