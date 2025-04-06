import { Routes } from '@angular/router';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';

export const routes: Routes = [
    { path: '', component: AllCategoriesComponent },
    { path: ':id/products', component: CategoryProductsComponent },
];