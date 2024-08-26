import { Component } from '@angular/core';
import { TypingEffectDirective } from '../../shared/directives/typingEffect';
import { ToggleInViewDirective } from '../../shared/directives/toggleInViewClass';
import { ShowMoreCardComponent } from '../../shared/components/show-more-card/show-more-card.component';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [TypingEffectDirective, ToggleInViewDirective, ShowMoreCardComponent],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss'
})
export class WhyUsComponent {

}
