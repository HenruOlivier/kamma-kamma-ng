import { Component } from '@angular/core';
import { ToggleInViewDirective } from '../../../shared/directives/toggleInViewClass';
import { TypingEffectDirective } from '../../../shared/directives/typingEffect';

@Component({
  selector: 'app-catagories',
  standalone: true,
  imports: [TypingEffectDirective, ToggleInViewDirective],
  templateUrl: './catagories.component.html',
  styleUrl: './catagories.component.scss'
})
export class CatagoriesComponent {

}
