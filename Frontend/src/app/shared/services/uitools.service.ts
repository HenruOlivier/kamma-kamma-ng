import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UitoolsService {

  private _sidebarOpen = new BehaviorSubject<boolean>(false);
  public get sidebarOpen$(): Observable<boolean> {
    return this._sidebarOpen.asObservable();
  }

  private _darkTheme = new BehaviorSubject<boolean>(false);
  public get darkTheme$(): Observable<boolean> {
    return this._darkTheme.asObservable();
  }

  constructor() { }

  toggleSidebar() {
    this._sidebarOpen.next(!this._sidebarOpen.value);
  }

  closeSidebar() {
    this._sidebarOpen.next(false);
  }

  openSidebar() {
    this._sidebarOpen.next(true);
  }

  toggleTheme() {
    this._darkTheme.next(!this._darkTheme.value);
  }

}
