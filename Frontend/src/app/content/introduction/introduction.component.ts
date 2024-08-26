import { Component } from '@angular/core';
import { ToggleInViewDirective } from '../../shared/directives/toggleInViewClass';
import { TypingEffectDirective } from '../../shared/directives/typingEffect';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [TypingEffectDirective, ToggleInViewDirective],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent {

}
