import { Component } from '@angular/core';
import { ToggleInViewDirective } from '../../../shared/directives/toggleInViewClass';
import { TypingEffectDirective } from '../../../shared/directives/typingEffect';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TypingEffectDirective, ToggleInViewDirective],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

}
