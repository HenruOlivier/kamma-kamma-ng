import { Routes } from '@angular/router';
import { ContentOutletComponent } from './layout/body-content/content-outlet/content-outlet.component';
import { SearchAllComponent } from './content/search-all/search-all.component';
import { ProductPageComponent } from './content/product-page/product-page.component';

export const routes: Routes = [
    { path: '', component: ContentOutletComponent },
    { path: 'search', component: SearchAllComponent },
    { path: 'product-page', component: ProductPageComponent },
];
