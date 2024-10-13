// // virtual-keyboard.directive.ts
// import { Directive, HostListener, ElementRef, Renderer2, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ChangeDetectorRef } from '@angular/core';
// import { SsVirtualKeyboardComponent } from './ss-virtual-keyboard/ss-virtual-keyboard.component';
// import { SSVirtualKey, SSVirtualKeyAction } from './ss-virtual-keyboard/ss-virtual-key.model';
// import { KeyboardDraggerComponent } from './keyboard-dragger/keyboard-dragger.component';

// @Directive({
//   selector: '[virtualKeyboard]',
// })
// export class VirtualKeyboardDirective {
//   constructor(
//     private el: ElementRef,
//     private renderer: Renderer2,
//     private componentFactoryResolver: ComponentFactoryResolver,
//     private viewContainerRef: ViewContainerRef,
//     private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
//   ) {}

//   public ignoreBlur = false;
//   private draggerComponentRef: ComponentRef<KeyboardDraggerComponent> | null = null;
//   private keyboardComponentRef: ComponentRef<SsVirtualKeyboardComponent> | null = null;
//   private isNumberInput = false;
//   keyboardOpen = false;

//   @HostListener('focus', ['$event'])
//   onFocus(event: Event): void {
//     if (!this.keyboardOpen) {
//       this.showVirtualKeyboard();
//     }
//     // Ensure cursor is positioned at the end
//     setTimeout(() => {
//       this.setCursorToEnd();
//     }, 0);
//   }

//   @HostListener('blur', ['$event'])
//   onBlur(event: Event): void {
//     if (this.ignoreBlur) {
//       this.el.nativeElement.focus();
//     } else {
//       console.log('blur');
//       this.hideVirtualKeyboard();
//     }
//   }

//   private showVirtualKeyboard() {
//     this.keyboardOpen = true;

//     const draggerFactory = this.componentFactoryResolver.resolveComponentFactory(KeyboardDraggerComponent);
//     const draggerComponentRef = this.viewContainerRef.createComponent(draggerFactory);

//     setTimeout(() => {
//       const keyboardFactory = this.componentFactoryResolver.resolveComponentFactory(SsVirtualKeyboardComponent);
//       const keyboardComponentRef = draggerComponentRef.instance.viewContainerRef.createComponent(keyboardFactory);

//       // Determine if the input is a number input
//       this.isNumberInput = this.el.nativeElement.type === 'number';
//       if (this.isNumberInput) {
//         // Temporarily change the input type to text
//         this.el.nativeElement.type = 'text';
//       }
//       keyboardComponentRef.instance.numberOnly = this.isNumberInput;

//       // Insert the keyboard component into the view after setting numberOnly
//       draggerComponentRef.instance.viewContainerRef.insert(keyboardComponentRef.hostView);

//       // Subscribe to keyboard component's events
//       keyboardComponentRef.instance.mouseDown.subscribe(() => {
//         this.ignoreBlur = true;
//       });
//       keyboardComponentRef.instance.mouseUp.subscribe(() => {
//         this.ignoreBlur = false;
//       });
//       keyboardComponentRef.instance.vkPress.subscribe((key: SSVirtualKey) => {
//         this.updateInputValue(key);
//       });

//       draggerComponentRef.instance.mouseDown.subscribe(() => {
//         this.ignoreBlur = true;
//       });
//       draggerComponentRef.instance.mouseUp.subscribe(() => {
//         this.ignoreBlur = false;
//       });

//       this.draggerComponentRef = draggerComponentRef;
//       this.keyboardComponentRef = keyboardComponentRef;
//     }, 0);
//   }

//   private keyActionHandlers: { [key: string]: (currentValue: string, cursorPosition: number, key: SSVirtualKey) => [string, number] } = {
//     [SSVirtualKeyAction.Default]: (currentValue, cursorPosition, key) => {
//       const beforeCursor = currentValue.slice(0, cursorPosition);
//       const afterCursor = currentValue.slice(cursorPosition);
//       return [beforeCursor + key.key + afterCursor, cursorPosition + 1];
//     },
//     [SSVirtualKeyAction.Spacebar]: (currentValue, cursorPosition, key) => {
//       const beforeCursor = currentValue.slice(0, cursorPosition);
//       const afterCursor = currentValue.slice(cursorPosition);
//       return [beforeCursor + ' ' + afterCursor, cursorPosition + 1];
//     },
//     [SSVirtualKeyAction.Backspace]: (currentValue, cursorPosition, key) => {
//       const beforeCursor = currentValue.slice(0, cursorPosition);
//       const afterCursor = currentValue.slice(cursorPosition);
//       if (cursorPosition > 0) {
//         return [beforeCursor.slice(0, -1) + afterCursor, cursorPosition - 1];
//       } else {
//         return [currentValue, cursorPosition];
//       }
//     },
//     [SSVirtualKeyAction.Enter]: (currentValue, cursorPosition, key) => {
//       console.log('enter pressed, value:', currentValue);
//       this.el.nativeElement.blur();
//       return [currentValue, cursorPosition];
//     },
//     [SSVirtualKeyAction.CloseKeyboard]: (currentValue, cursorPosition, key) => {
//       this.el.nativeElement.blur();
//       return [currentValue, cursorPosition];
//     }
//   };

//   private updateInputValue(key: SSVirtualKey): void {
//     const nativeElement = this.el.nativeElement;
//     const cursorPosition = nativeElement.selectionStart;
//     const currentValue = nativeElement.value;
//     const handler = this.keyActionHandlers[key.keyAction];

//     if (handler) {
//       const [newValue, newCursorPosition] = handler(currentValue, cursorPosition, key);

//       if (this.isNumberInput) {
//         // Validate key for numeric inputs
//         if (!/^\d$/.test(key.key) && key.key !== '.' && key.key !== '-' && key.keyAction !== SSVirtualKeyAction.Backspace) {
//           return; // Ignore non-numeric key presses
//         }

//         // Manually construct the new number value
//         let validNumberValue = newValue.replace(/[^\d.-]/g, '');

//         // Handle backspace separately for number input
//         if (key.keyAction === SSVirtualKeyAction.Backspace) {
//           if (cursorPosition > 0) {
//             validNumberValue = currentValue.slice(0, cursorPosition - 1) + currentValue.slice(cursorPosition);
//           }
//         }

//         // Set the new value
//         nativeElement.value = validNumberValue;
//       } else {
//         // Set the new value and cursor position for text inputs
//         nativeElement.value = newValue;
//         nativeElement.setSelectionRange(newCursorPosition, newCursorPosition);
//       }

//       // Manually trigger Angular change detection
//       nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
//       this.cdr.markForCheck();  // Mark for check to trigger change detection
//     } else {
//       console.warn(`No handler defined for key action ${key.keyAction}`);
//     }
//   }

//   private setCursorToEnd(): void {
//     const nativeElement = this.el.nativeElement;
//     const valueLength = nativeElement.value.length;
//     nativeElement.setSelectionRange(valueLength, valueLength);
//   }

//   private hideVirtualKeyboard() {
//     console.log('hideVirtualKeyboard');
//     this.keyboardOpen = false;

//     if (this.keyboardComponentRef) {
//       this.keyboardComponentRef.destroy();
//       this.keyboardComponentRef = null;
//     }

//     if (this.draggerComponentRef) {
//       this.draggerComponentRef.destroy();
//       this.draggerComponentRef = null;
//     }

//     if (this.isNumberInput) {
//       // Revert the input type back to number
//       this.el.nativeElement.type = 'number';
//     }
//   }
// }


import { Directive, HostListener, ElementRef, Renderer2, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { SsVirtualKeyboardComponent } from './ss-virtual-keyboard/ss-virtual-keyboard.component';
import { SSVirtualKey, SSVirtualKeyAction } from './ss-virtual-keyboard/ss-virtual-key.model';
import { KeyboardDraggerComponent } from './keyboard-dragger/keyboard-dragger.component';

@Directive({
  selector: '[virtualKeyboard]',
})
export class VirtualKeyboardDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  public ignoreBlur = false;
  private draggerComponentRef: ComponentRef<KeyboardDraggerComponent> | null = null;
  private keyboardComponentRef: ComponentRef<SsVirtualKeyboardComponent> | null = null;
  private isNumberInput = false;
  private originalBottomPadding: string | null = null;
  keyboardOpen = false;

  @HostListener('focus', ['$event'])
  onFocus(event: Event): void {
    if (!this.keyboardOpen) {
      this.showVirtualKeyboard();
    }
    setTimeout(() => {
      this.setCursorToEnd();
      this.adjustScroll();
    }, 0);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event): void {
    if (this.ignoreBlur) {
      this.el.nativeElement.focus();
    } else {
      this.hideVirtualKeyboard();
    }
  }

  private showVirtualKeyboard() {
    this.keyboardOpen = true;

    const draggerFactory = this.componentFactoryResolver.resolveComponentFactory(KeyboardDraggerComponent);
    const draggerComponentRef = this.viewContainerRef.createComponent(draggerFactory);

    setTimeout(() => {
      const keyboardFactory = this.componentFactoryResolver.resolveComponentFactory(SsVirtualKeyboardComponent);
      const keyboardComponentRef = draggerComponentRef.instance.viewContainerRef.createComponent(keyboardFactory);

      this.isNumberInput = this.el.nativeElement.type === 'number';
      if (this.isNumberInput) {
        this.el.nativeElement.type = 'text';
      }
      keyboardComponentRef.instance.numberOnly = this.isNumberInput;

      draggerComponentRef.instance.viewContainerRef.insert(keyboardComponentRef.hostView);

      keyboardComponentRef.instance.mouseDown.subscribe(() => {
        this.ignoreBlur = true;
      });
      keyboardComponentRef.instance.mouseUp.subscribe(() => {
        this.ignoreBlur = false;
      });
      keyboardComponentRef.instance.vkPress.subscribe((key: SSVirtualKey) => {
        this.updateInputValue(key);
      });

      draggerComponentRef.instance.mouseDown.subscribe(() => {
        this.ignoreBlur = true;
      });
      draggerComponentRef.instance.mouseUp.subscribe(() => {
        this.ignoreBlur = false;
      });

      this.draggerComponentRef = draggerComponentRef;
      this.keyboardComponentRef = keyboardComponentRef;

      this.addPadding();
    }, 0);
  }

  private adjustScroll() {
    const inputRect = this.el.nativeElement.getBoundingClientRect();
    const keyboardHeight = 310; // Approximate height of the virtual keyboard
    const viewportHeight = window.innerHeight;

    if (inputRect.bottom + keyboardHeight > viewportHeight) {
      const offset = (inputRect.bottom + keyboardHeight) - viewportHeight;
      window.scrollBy(0, offset);
    }
  }

  private keyActionHandlers: { [key: string]: (currentValue: string, cursorPosition: number, key: SSVirtualKey) => [string, number] } = {
    [SSVirtualKeyAction.Default]: (currentValue, cursorPosition, key) => {
      const beforeCursor = currentValue.slice(0, cursorPosition);
      const afterCursor = currentValue.slice(cursorPosition);
      return [beforeCursor + key.key + afterCursor, cursorPosition + 1];
    },
    [SSVirtualKeyAction.Spacebar]: (currentValue, cursorPosition, key) => {
      const beforeCursor = currentValue.slice(0, cursorPosition);
      const afterCursor = currentValue.slice(cursorPosition);
      return [beforeCursor + ' ' + afterCursor, cursorPosition + 1];
    },
    [SSVirtualKeyAction.Backspace]: (currentValue, cursorPosition, key) => {
      const beforeCursor = currentValue.slice(0, cursorPosition);
      const afterCursor = currentValue.slice(cursorPosition);
      if (cursorPosition > 0) {
        return [beforeCursor.slice(0, -1) + afterCursor, cursorPosition - 1];
      } else {
        return [currentValue, cursorPosition];
      }
    },
    [SSVirtualKeyAction.Enter]: (currentValue, cursorPosition, key) => {
      this.el.nativeElement.blur();
      return [currentValue, cursorPosition];
    },
    [SSVirtualKeyAction.CloseKeyboard]: (currentValue, cursorPosition, key) => {
      this.el.nativeElement.blur();
      return [currentValue, cursorPosition];
    }
  };

  private updateInputValue(key: SSVirtualKey): void {
    const nativeElement = this.el.nativeElement;
    const cursorPosition = nativeElement.selectionStart;
    const currentValue = nativeElement.value;
    const handler = this.keyActionHandlers[key.keyAction];

    if (handler) {
      const [newValue, newCursorPosition] = handler(currentValue, cursorPosition, key);

      if (this.isNumberInput) {
        if (!/^\d$/.test(key.key) && key.key !== '.' && key.key !== '-' && key.keyAction !== SSVirtualKeyAction.Backspace) {
          return;
        }
        let validNumberValue = newValue.replace(/[^\d.-]/g, '');

        if (key.keyAction === SSVirtualKeyAction.Backspace) {
          if (cursorPosition > 0) {
            validNumberValue = currentValue.slice(0, cursorPosition - 1) + currentValue.slice(cursorPosition);
          }
        }
        nativeElement.value = validNumberValue;
      } else {
        nativeElement.value = newValue;
        nativeElement.setSelectionRange(newCursorPosition, newCursorPosition);
      }

      nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
      this.cdr.markForCheck();
    } else {
      console.warn(`No handler defined for key action ${key.keyAction}`);
    }
  }

  private setCursorToEnd(): void {
    const nativeElement = this.el.nativeElement;
    const valueLength = nativeElement.value.length;
    nativeElement.setSelectionRange(valueLength, valueLength);
  }

  private hideVirtualKeyboard() {
    this.keyboardOpen = false;

    if (this.keyboardComponentRef) {
      this.keyboardComponentRef.destroy();
      this.keyboardComponentRef = null;
    }

    if (this.draggerComponentRef) {
      this.draggerComponentRef.destroy();
      this.draggerComponentRef = null;
    }

    if (this.isNumberInput) {
      this.el.nativeElement.type = 'number';
    }

    this.removePadding();
  }

  private addPadding() {
    if (this.originalBottomPadding === null) {
      const computedStyle = getComputedStyle(document.body);
      this.originalBottomPadding = computedStyle.paddingBottom;
    }
    this.renderer.setStyle(document.body, 'paddingBottom', '310px');
  }

  private removePadding() {
    if (this.originalBottomPadding !== null) {
      this.renderer.setStyle(document.body, 'paddingBottom', this.originalBottomPadding);
      this.originalBottomPadding = null;
    }
  }
}
