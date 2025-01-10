import { Routes } from '@angular/router';
import { ContentOutletComponent } from './layout/body-content/content-outlet/content-outlet.component';
import { ProductGridComponent } from './functions/products/product-grid/product-grid.component';
import { ProductFormComponent } from './functions/products/product-form/product-form.component';
import { CategoryGridComponent } from './functions/categories/category-grid/category-grid.component';
import { CategoryFormComponent } from './functions/categories/category-form/category-form.component';
import { ImageGridComponent } from './functions/images/image-grid/image-grid.component';
import { ImageFormComponent } from './functions/images/image-form/image-form.component';
import { OrderFormComponent } from './functions/orders/order-form/order-form.component';
import { OrderGridComponent } from './functions/orders/order-grid/order-grid.component';
import { VariationFormComponent } from './functions/products/variation-form/variation-form.component';

export const routes: Routes = [
    { path: '', component: ContentOutletComponent },
    { path: 'products', component:  ProductGridComponent},
    { path: 'products/form', component: ProductFormComponent },
    { path: 'products/form/:_id', component: ProductFormComponent },
    // { path: 'products/form/:_id', component: VariationFormComponent },
    { path: 'categories', component:  CategoryGridComponent},
    { path: 'categories/form', component: CategoryFormComponent },
    { path: 'categories/form/:_id', component: CategoryFormComponent },
    { path: 'orders', component: OrderGridComponent },
    { path: 'orders/form', component: OrderFormComponent },
    { path: 'orders/form/:_id', component: OrderFormComponent },
    { path: 'images', component:  ImageGridComponent},
    { path: 'images/form', component: ImageFormComponent },
    { path: 'images/form/:_id', component: ImageFormComponent },
    { path: '', component: ContentOutletComponent },
];
