import { Component, ElementRef, HostListener } from '@angular/core';
import { UitoolsService } from '../../shared/services/uitools.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(
    private eRef: ElementRef,
    private uiToolsService: UitoolsService
  ) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.onClosedSidebar();
    }
  }

  onToggleTheme() {
    this.uiToolsService.toggleTheme();
  }

  onClosedSidebar() {
    this.uiToolsService.closeSidebar();
  }

}
