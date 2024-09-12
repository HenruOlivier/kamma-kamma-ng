import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UitoolsService } from '../../shared/services/uitools.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private uiToolsService: UitoolsService
  ) { }

  currentFunctionName: string = '';

  toggleSidebar() {
    this.uiToolsService.toggleSidebar();
  }

}
