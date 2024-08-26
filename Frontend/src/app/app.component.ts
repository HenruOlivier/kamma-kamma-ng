import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { UitoolsService } from './shared/services/uitools.service';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent, NgClass, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public uiToolsService: UitoolsService) {
  }

  ngOnInit() {
    // this.updateViewportHeight();
  }

  // @HostListener('window:resize')
  // @HostListener('window:orientationchange')
  // updateViewportHeight() {
  //   const vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty('--vh', `${vh}px`);
  // }

  title = 'henru-dev';
}
