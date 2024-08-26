import { Component } from '@angular/core';
import { TypingEffectDirective } from '../../shared/directives/typingEffect';

@Component({
  selector: 'app-get-going',
  standalone: true,
  imports: [TypingEffectDirective],
  templateUrl: './get-going.component.html',
  styleUrl: './get-going.component.scss'
})
export class GetGoingComponent {

}
