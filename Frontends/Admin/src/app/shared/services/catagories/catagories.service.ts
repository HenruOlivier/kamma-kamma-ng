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

  private categoriesErrorSubject = new BehaviorSubject<string | null>(null);
  public get categoriesError$(): Observable<string | null> {
    return this.categoriesErrorSubject.asObservable();
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
  fetchAllCategories(): Observable<Category[]> {
    this.categoriesLoadingSubject.next(true);
    return this.http.get<Category[]>(this.baseUrl)
      .pipe(
        tap((categories: Category[]) => {
          this.allCategoriesSubject.next(categories);
        }),
        catchError((error: any) => {
          console.error('Error while fetching categories:', error);
          this.categoriesErrorSubject.next('Error while fetching categories');
          return of([]);
        }),
        finalize(() => {
          this.categoriesLoadingSubject.next(false);
        })
      );
  }

  // Fetch a category by ID
  fetchCategoryById(categoryId: string): Observable<Category | null> {
    return this.http.get<Category>(`${this.baseUrl}${categoryId}`)
      .pipe(
        tap((category: Category) => {
          this.currentCategorySubject.next(category);
        }),
        catchError((error: any) => {
          console.error('Error while fetching category:', error);
          return of(null);
        })
      );
  }

  // Add a new category
  addCategory(category: Category): Observable<Category | null> {
    return this.http.post<Category>(this.baseUrl, category)
      .pipe(
        tap((newCategory: Category) => {
          this.allCategoriesSubject.next([...(this.allCategoriesSubject.value || []), newCategory]);
        }),
        catchError((error: any) => {
          console.error('Error while adding category:', error);
          return of(null);
        })
      );
  }

  // Update an existing category by ID
  updateCategory(categoryId: string, updatedCategory: Category): Observable<Category | null> {
    return this.http.put<Category>(`${this.baseUrl}${categoryId}`, updatedCategory)
      .pipe(
        tap((res: Category) => {
          const currentCategories = this.allCategoriesSubject.value;
          if (currentCategories && currentCategories.length > 0) {
            const updatedCategories = currentCategories.map((c: Category) =>
              c._id === categoryId ? res : c
            );
            this.allCategoriesSubject.next(updatedCategories || []);
          }
        }),
        catchError((error: any) => {
          console.error('Error while updating category:', error);
          return of(null);
        })
      );
  }

  // Delete a category by ID
  deleteCategory(categoryId: string): Observable<boolean> {
    return this.http.delete<void>(`${this.baseUrl}${categoryId}`)
      .pipe(
        tap(() => {
          const currentCategories = this.allCategoriesSubject.value;
          if (currentCategories && currentCategories.length > 0) {
            const updatedCategories = currentCategories.filter((c: Category) => c._id !== categoryId);
            this.allCategoriesSubject.next(updatedCategories || []);
          }
        }),
        catchError((error: any) => {
          console.error('Error while deleting category:', error);
          return of(false);
        })
      );
  }
}