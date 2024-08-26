import { Component } from '@angular/core';
import { IntroPageComponent } from '../intro-page/intro-page.component';
import { TechnologiesComponent } from '../technologies/technologies.component';
import { IntroductionComponent } from '../introduction/introduction.component';
import { ServicesComponent } from '../services/services.component';
import { ProcessMapComponent } from '../process-map/process-map.component';
import { WhyUsComponent } from '../why-us/why-us.component';
import { GetGoingComponent } from '../get-going/get-going.component';

@Component({
  selector: 'app-content-outlet',
  standalone: true,
  imports: [IntroPageComponent, IntroductionComponent, TechnologiesComponent, ServicesComponent, ProcessMapComponent, WhyUsComponent, GetGoingComponent],
  templateUrl: './content-outlet.component.html',
  styleUrl: './content-outlet.component.scss'
})
export class ContentOutletComponent {

}
