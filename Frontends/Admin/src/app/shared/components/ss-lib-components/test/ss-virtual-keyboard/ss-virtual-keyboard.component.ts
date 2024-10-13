import { AfterViewInit, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { SSKeyboardLayout } from './ss-virtual-keyboard.model';

import { NUMERIC, QWERTY } from './ss-virtkey-qwerty';
import { SSVirtualKey, SSVirtualKeyAction } from './ss-virtual-key.model';

const KeyboardConfigs = [
  QWERTY,
  NUMERIC
]

@Component({
  selector: 'app-ss-virtual-keyboard',
  templateUrl: './ss-virtual-keyboard.component.html',
  styleUrls: ['./ss-virtual-keyboard.component.scss']
})
export class SsVirtualKeyboardComponent implements AfterViewInit {

  @Output() mouseDown = new EventEmitter<void>();
  @Output() mouseUp = new EventEmitter<void>();
  @Output() vkPress = new EventEmitter<SSVirtualKey>();

  @Input() numberOnly: boolean = false;

  keyboardType: string;
  keyboardLayout: SSKeyboardLayout;

  currentStateName: string;
  currentState: { name: string, keys: SSVirtualKey[][] } = { name: '', keys: [] };

  keyboardSetup: boolean = false;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.getKeyboardLocaleFromLocalStorage();
    this.loadKeyboardConfig();
    this.loadInitialState();
    this.keyboardSetup = true;
  }


  getKeyboardLocaleFromLocalStorage() {
    this.keyboardType = window.localStorage.getItem('ss-keyboard-locale') || 'qwerty';
  }

  loadKeyboardConfig() {
    if (this.numberOnly) {
      this.keyboardLayout = NUMERIC;
    } else {
      this.keyboardLayout = KeyboardConfigs.find((config: SSKeyboardLayout) => config.name === this.keyboardType) || QWERTY;
    }
  }

  loadInitialState() {
    if (this.keyboardLayout && this.keyboardLayout.states && this.keyboardLayout.states.length > 0) {
      if (this.numberOnly) {
        this.currentStateName = this.keyboardLayout.states[0].name;
        this.currentState = this.keyboardLayout.states[0];
      } else {
        this.currentStateName = this.keyboardLayout.states[0].name;
        this.currentState = this.keyboardLayout.states[0];
      }
    }
  }

  onKeyPress(key: SSVirtualKey) {
    console.log(key);
    this.vkPress.emit(key);
    if (key.keyAction === SSVirtualKeyAction.Default) {

    }
    if (key.keyAction === SSVirtualKeyAction.Spacebar) {

    }
    if (key.keyAction === SSVirtualKeyAction.Backspace) {

    }
    if (key.keyAction === SSVirtualKeyAction.Enter) {

    }
    if (key.keyAction === SSVirtualKeyAction.StateTransitionTrigger) {
      console.log(this.keyboardLayout)
      let newState = this.keyboardLayout.states.find(state => state.name === key.transitionState);
      if (newState) {
        this.currentStateName = newState.name;
        this.currentState = newState;
      }
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.mouseDown.emit();
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.mouseUp.emit();
  }
}
