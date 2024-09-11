import { Routes } from '@angular/router';
import { ContentOutletComponent } from './layout/body-content/content-outlet/content-outlet.component';
import { SearchAllComponent } from './content/search-all/search-all.component';

export const routes: Routes = [
    { path: '', component: ContentOutletComponent },
    { path: 'search', component: SearchAllComponent },
    { path: 'search/:_searchText', component: SearchAllComponent },
];
