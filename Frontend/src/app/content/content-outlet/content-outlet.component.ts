import { Component } from '@angular/core';
import { IntroPageComponent } from '../intro-page/intro-page.component';
import { IntroductionComponent } from '../introduction/introduction.component';
import { ServicesComponent } from '../services/services.component';

@Component({
  selector: 'app-content-outlet',
  standalone: true,
  imports: [IntroPageComponent, IntroductionComponent, ServicesComponent],
  templateUrl: './content-outlet.component.html',
  styleUrl: './content-outlet.component.scss'
})
export class ContentOutletComponent {

}
