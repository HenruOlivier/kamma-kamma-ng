import { Routes } from '@angular/router';
import { ContentOutletComponent } from './layout/body-content/content-outlet/content-outlet.component';
import { ProductGridComponent } from './functions/products/product-grid/product-grid.component';

export const routes: Routes = [
    { path: '', component: ContentOutletComponent },
    { path: '/products', component:  ProductGridComponent},
    { path: '', component: ContentOutletComponent },
    { path: '', component: ContentOutletComponent },
    { path: '', component: ContentOutletComponent },
];
