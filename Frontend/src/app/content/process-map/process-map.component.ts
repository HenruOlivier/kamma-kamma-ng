import { Component } from '@angular/core';
import { TypingEffectDirective } from '../../shared/directives/typingEffect';

@Component({
  selector: 'app-process-map',
  standalone: true,
  imports: [TypingEffectDirective],
  templateUrl: './process-map.component.html',
  styleUrl: './process-map.component.scss'
})
export class ProcessMapComponent {

}
