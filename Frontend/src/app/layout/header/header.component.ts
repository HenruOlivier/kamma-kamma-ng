import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UitoolsService } from '../../shared/services/uitools.service';
import { SearchBarComponent } from '../../content/search-bar/search-bar.component';
import { SearchAllComponent } from "../../content/search-all/search-all.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, SearchAllComponent],
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
