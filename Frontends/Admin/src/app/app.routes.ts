import { Routes } from '@angular/router';
import { ContentOutletComponent } from './layout/body-content/content-outlet/content-outlet.component';
import { ProductGridComponent } from './functions/products/product-grid/product-grid.component';
import { ProductFormComponent } from './functions/products/product-form/product-form.component';
import { CatagoryGridComponent } from './functions/catagories/catagory-grid/catagory-grid.component';
import { CatagoryFormComponent } from './functions/catagories/catagory-form/catagory-form.component';

export const routes: Routes = [
    { path: '', component: ContentOutletComponent },
    { path: 'products', component:  ProductGridComponent},
    { path: 'products/form', component: ProductFormComponent },
    { path: 'products/form/:_id', component: ProductFormComponent },
    { path: 'catagories', component:  CatagoryGridComponent},
    { path: 'catagories/form', component: CatagoryFormComponent },
    { path: 'products/form/:_id', component: CatagoryFormComponent },
    { path: '', component: ContentOutletComponent },
];
