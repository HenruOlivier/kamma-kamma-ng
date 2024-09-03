import { Component } from '@angular/core';
import { IntroPageComponent } from '../intro-page/intro-page.component';
import { IntroductionComponent } from '../introduction/introduction.component';
import { ServicesComponent } from '../services/services.component';
import { CatagoriesComponent } from '../catagories/catagories.component';

@Component({
  selector: 'app-content-outlet',
  standalone: true,
  imports: [IntroPageComponent, IntroductionComponent, ServicesComponent, CatagoriesComponent],
  templateUrl: './content-outlet.component.html',
  styleUrl: './content-outlet.component.scss'
})
export class ContentOutletComponent {

}
