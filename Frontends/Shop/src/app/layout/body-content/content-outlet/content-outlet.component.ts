import { Component } from '@angular/core';
import { IntroPageComponent } from '../intro-page/intro-page.component';
import { IntroductionComponent } from '../introduction/introduction.component';
import { ServicesComponent } from '../../../content/services/services.component';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-content-outlet',
  standalone: true,
  imports: [IntroPageComponent, IntroductionComponent, ServicesComponent, CategoriesComponent],
  templateUrl: './content-outlet.component.html',
  styleUrl: './content-outlet.component.scss'
})
export class ContentOutletComponent {

}
