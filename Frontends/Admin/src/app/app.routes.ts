import { Routes } from '@angular/router';
import { ContentOutletComponent } from './layout/body-content/content-outlet/content-outlet.component';
import { ProductGridComponent } from './functions/products/product-grid/product-grid.component';
import { ProductFormComponent } from './functions/products/product-form/product-form.component';

export const routes: Routes = [
    { path: '', component: ContentOutletComponent },
    { path: 'products', component:  ProductGridComponent},
    { path: 'products/form', component: ProductFormComponent },
    { path: 'products/form/:_id', component: ProductFormComponent },
    { path: '', component: ContentOutletComponent },
    { path: '', component: ContentOutletComponent },
];
