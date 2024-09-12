import { Component } from '@angular/core';
import { FunctionsPageComponent } from '../../functions-page/functions-page.component';

@Component({
  selector: 'app-content-outlet',
  standalone: true,
  imports: [FunctionsPageComponent],
  templateUrl: './content-outlet.component.html',
  styleUrl: './content-outlet.component.scss'
})
export class ContentOutletComponent {

}
