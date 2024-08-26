import { Component } from '@angular/core';
import { TypingEffectDirective } from '../../shared/directives/typingEffect';
import { ToggleInViewDirective } from '../../shared/directives/toggleInViewClass';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [TypingEffectDirective, ToggleInViewDirective],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss'
})
export class TechnologiesComponent {

}
