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

  private singleUpdateLoadingSubject = new BehaviorSubject<boolean>(false);
  public get singleUpdateLoading$(): Observable<boolean> {
    return this.singleUpdateLoadingSubject.asObservable();
  }

  private createUpdateErrSubject = new BehaviorSubject<string | null>(null);
  public get createUpdateErr$(): Observable<string | null> {
    return this.createUpdateErrSubject.asObservable();
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

  // Add a new category
  addCategory(category: Category): Observable<Category | null> {
    this.categoriesLoadingSubject.next(true);
    this.singleUpdateLoadingSubject.next(true);
    this.createUpdateErrSubject.next(null);

    return this.http.post<Category>(this.baseUrl, category)
      .pipe(
        tap((newCategory: Category) => {
          this.allCategoriesSubject.next([...(this.allCategoriesSubject.value || []), newCategory]);
        }),
        catchError((error: any) => {
          console.error('Error while adding category:', error);
          this.createUpdateErrSubject.next('Error while adding category');
          return of(null);
        }),
        finalize(() => {
          this.categoriesLoadingSubject.next(false);
          this.singleUpdateLoadingSubject.next(false);
        })
      );
  }

  // Update an existing category by ID
  updateCategory(categoryId: string, updatedCategory: Category): Observable<Category | null> {
    this.categoryLoadingSubject.next(true);
    this.singleUpdateLoadingSubject.next(true);
    this.createUpdateErrSubject.next(null);

    return this.http.put<Category>(`${this.baseUrl}${categoryId}`, updatedCategory)
      .pipe(
        tap((res: Category) => {
          // Update the current category if it's the one being updated
          if (this.currentCategorySubject.value?._id === categoryId) {
            this.currentCategorySubject.next(res);
          }

          // Update the category in the category list
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
          this.createUpdateErrSubject.next('Error while updating category');
          return of(null);
        }),
        finalize(() => {
          this.categoryLoadingSubject.next(false);
          this.singleUpdateLoadingSubject.next(false);
        })
      );
  }

  // Delete a category by ID
  deleteCategory(categoryId: string): Observable<boolean> {
    this.categoriesLoadingSubject.next(true);

    return this.http.delete<void>(`${this.baseUrl}${categoryId}`)
      .pipe(
        tap(() => {
          // Remove the category from the category list
          const currentCategories = this.allCategoriesSubject.value;
          if (currentCategories && currentCategories.length > 0) {
            const updatedCategories = currentCategories.filter((c: Category) => c._id !== categoryId);
            this.allCategoriesSubject.next(updatedCategories || []);
          }
        }),
        catchError((error: any) => {
          console.error('Error while deleting category:', error);
          this.categoriesErrorSubject.next('Error while deleting category');
          return of(false);
        }),
        finalize(() => {
          this.categoriesLoadingSubject.next(false);
        })
      );
  }
}