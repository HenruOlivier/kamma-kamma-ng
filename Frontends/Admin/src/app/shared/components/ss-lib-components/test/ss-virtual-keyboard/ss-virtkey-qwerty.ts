import { SSVirtualKey, SSVirtualKeyAction, SSVirtualKeyClasses } from "./ss-virtual-key.model";
import { SSKeyboardLayout } from "./ss-virtual-keyboard.model";

export const QWERTY: SSKeyboardLayout = {
    name: 'qwerty',
    states: [
        {
            name: 'home',
            keys: [
                [new SSVirtualKey({ key: 'q' }), new SSVirtualKey({ key: 'w' }), new SSVirtualKey({ key: 'e' }), new SSVirtualKey({ key: 'r' }), new SSVirtualKey({ key: 't' }), new SSVirtualKey({ key: 'y' }), new SSVirtualKey({ key: 'u' }), new SSVirtualKey({ key: 'i' }), new SSVirtualKey({ key: 'o' }), new SSVirtualKey({ key: 'p' }), new SSVirtualKey({ key: '', innerHTML: '<i class="bi bi-backspace ss-fs-5"></i>', keyAction: SSVirtualKeyAction.Backspace })],
                [new SSVirtualKey({ key: 'a' }), new SSVirtualKey({ key: 's' }), new SSVirtualKey({ key: 'd' }), new SSVirtualKey({ key: 'f' }), new SSVirtualKey({ key: 'g' }), new SSVirtualKey({ key: 'h' }), new SSVirtualKey({ key: 'j' }), new SSVirtualKey({ key: 'k' }), new SSVirtualKey({ key: 'l' }), new SSVirtualKey({ key: '', keyClass: SSVirtualKeyClasses.LargeKey, innerHTML: '<i class="bi bi-arrow-return-left"></i>', keyAction: SSVirtualKeyAction.Enter })],
                [new SSVirtualKey({ key: '', keyClass: [SSVirtualKeyClasses.MediumKey, SSVirtualKeyClasses.AccentKey], keyAction: SSVirtualKeyAction.StateTransitionTrigger, transitionState: 'HOME', innerHTML: '<i class="bi bi-shift"></i>' }), new SSVirtualKey({ key: 'z' }), new SSVirtualKey({ key: 'x' }), new SSVirtualKey({ key: 'c' }), new SSVirtualKey({ key: 'v' }), new SSVirtualKey({ key: 'b' }), new SSVirtualKey({ key: 'n' }), new SSVirtualKey({ key: 'm' }), new SSVirtualKey({ key: '', keyClass: [SSVirtualKeyClasses.MediumKey, SSVirtualKeyClasses.AccentKey], keyAction: SSVirtualKeyAction.StateTransitionTrigger, transitionState: 'HOME', innerHTML: '<i class="bi bi-shift"></i>' })],
                [new SSVirtualKey({ key: '123.?', keyClass: SSVirtualKeyClasses.MediumKey, keyAction: SSVirtualKeyAction.StateTransitionTrigger, transitionState: 'numbers' }), new SSVirtualKey({ key: ' ', keyClass: SSVirtualKeyClasses.XLargeKey, keyAction: SSVirtualKeyAction.Spacebar }), new SSVirtualKey({ key: '123.?', keyClass: SSVirtualKeyClasses.MediumKey, keyAction: SSVirtualKeyAction.StateTransitionTrigger, transitionState: 'numbers' }), new SSVirtualKey({ innerHTML:'<i class="bi bi-keyboard ss-fs-5"></i><i class="bi bi-arrow-down"></i>', keyAction: SSVirtualKeyAction.CloseKeyboard})]
            ]
        },
        {
            name: 'HOME',
            keys: [
                [new SSVirtualKey({ key: 'Q' }), new SSVirtualKey({ key: 'W' }), new SSVirtualKey({ key: 'E' }), new SSVirtualKey({ key: 'R' }), new SSVirtualKey({ key: 'T' }), new SSVirtualKey({ key: 'Y' }), new SSVirtualKey({ key: 'U' }), new SSVirtualKey({ key: 'I' }), new SSVirtualKey({ key: 'O' }), new SSVirtualKey({ key: 'P' }), new SSVirtualKey({ key: '', innerHTML: '<i class="bi bi-backspace ss-fs-5"></i>', keyAction: SSVirtualKeyAction.Backspace })],
                [new SSVirtualKey({ key: 'A' }), new SSVirtualKey({ key: 'S' }), new SSVirtualKey({ key: 'D' }), new SSVirtualKey({ key: 'F' }), new SSVirtualKey({ key: 'G' }), new SSVirtualKey({ key: 'H' }), new SSVirtualKey({ key: 'J' }), new SSVirtualKey({ key: 'K' }), new SSVirtualKey({ key: 'L' }), new SSVirtualKey({ key: '', keyClass: SSVirtualKeyClasses.LargeKey, innerHTML: '<i class="bi bi-arrow-return-left"></i>', keyAction: SSVirtualKeyAction.Enter })],
                [new SSVirtualKey({ key: '', keyClass: [SSVirtualKeyClasses.MediumKey, SSVirtualKeyClasses.AccentKey], keyAction: SSVirtualKeyAction.StateTransitionTrigger, transitionState: 'home', innerHTML: '<i class="bi bi-shift-fill"></i>' }), new SSVirtualKey({ key: 'Z' }), new SSVirtualKey({ key: 'X' }), new SSVirtualKey({ key: 'C' }), new SSVirtualKey({ key: 'V' }), new SSVirtualKey({ key: 'B' }), new SSVirtualKey({ key: 'N' }), new SSVirtualKey({ key: 'M' }), new SSVirtualKey({ key: '', keyClass: [SSVirtualKeyClasses.MediumKey, SSVirtualKeyClasses.AccentKey], keyAction: SSVirtualKeyAction.StateTransitionTrigger, transitionState: 'home', innerHTML: '<i class="bi bi-shift-fill"></i>' })],
                [new SSVirtualKey({ key: '123.?', keyClass: SSVirtualKeyClasses.MediumKey, keyAction: SSVirtualKeyAction.StateTransitionTrigger, transitionState: 'numbers' }), new SSVirtualKey({ key: ' ', keyClass: SSVirtualKeyClasses.XLargeKey, keyAction: SSVirtualKeyAction.Spacebar }), new SSVirtualKey({ key: '123.?', keyClass: SSVirtualKeyClasses.MediumKey }), new SSVirtualKey({ innerHTML:'<i class="bi bi-keyboard ss-fs-5"></i><i class="bi bi-arrow-down"></i>', keyAction: SSVirtualKeyAction.CloseKeyboard})]
            ]
        },
        {
            name: 'numbers',
            keys: [
                [new SSVirtualKey({ key: '1' }), new SSVirtualKey({ key: '2' }), new SSVirtualKey({ key: '3' }), new SSVirtualKey({ key: '4' }), new SSVirtualKey({ key: '5' }), new SSVirtualKey({ key: '6' }), new SSVirtualKey({ key: '7' }), new SSVirtualKey({ key: '8' }), new SSVirtualKey({ key: '9' }), new SSVirtualKey({ key: '0' }), new SSVirtualKey({ key: '', innerHTML: '<i class="bi bi-backspace ss-fs-5"></i>', keyAction: SSVirtualKeyAction.Backspace })],
                [new SSVirtualKey({ key: '-' }), new SSVirtualKey({ key: '=' }), new SSVirtualKey({ key: '[' }), new SSVirtualKey({ key: ']' }), new SSVirtualKey({ key: ';' }), new SSVirtualKey({ key: '\'' }), new SSVirtualKey({ key: ',' }), new SSVirtualKey({ key: '.' }), new SSVirtualKey({ key: '/' }), new SSVirtualKey({ key: '', keyClass: SSVirtualKeyClasses.LargeKey, innerHTML: '<i class="bi bi-arrow-return-left"></i>', keyAction: SSVirtualKeyAction.Enter })],
                [new SSVirtualKey({ key: '?' }), new SSVirtualKey({ key: '!' }), new SSVirtualKey({ key: '@' }), new SSVirtualKey({ key: '#' }), new SSVirtualKey({ key: '$' }), new SSVirtualKey({ key: '%' }), new SSVirtualKey({ key: '&' }), new SSVirtualKey({ key: '*' }), new SSVirtualKey({ key: '(' }), new SSVirtualKey({ key: ')' })],
                [new SSVirtualKey({ key: 'abc', keyClass: SSVirtualKeyClasses.MediumKey, keyAction: SSVirtualKeyAction.StateTransitionTrigger, transitionState: 'home' }), new SSVirtualKey({ key: ' ', keyClass: SSVirtualKeyClasses.XLargeKey }), new SSVirtualKey({ key: 'abc', keyClass: SSVirtualKeyClasses.MediumKey, keyAction: SSVirtualKeyAction.StateTransitionTrigger, transitionState: 'home' }), new SSVirtualKey({ innerHTML:'<i class="bi bi-keyboard ss-fs-5"></i><i class="bi bi-arrow-down"></i>', keyAction: SSVirtualKeyAction.CloseKeyboard})]
            ]
        }
    ]
}

export const NUMERIC: SSKeyboardLayout = {
    name: 'numeric',
    states: [
        {
            name: 'home',
            keys: [
                [new SSVirtualKey({ key: '1' }), new SSVirtualKey({ key: '2' }), new SSVirtualKey({ key: '3' })],
                [new SSVirtualKey({ key: '4' }), new SSVirtualKey({ key: '5' }), new SSVirtualKey({ key: '6' })],
                [new SSVirtualKey({ key: '7' }), new SSVirtualKey({ key: '8' }), new SSVirtualKey({ key: '9' })],
                [new SSVirtualKey({ key: '.' }), new SSVirtualKey({ key: '0' }), new SSVirtualKey({ key: '', innerHTML: '<i class="bi bi-backspace ss-fs-5"></i>', keyAction: SSVirtualKeyAction.Backspace })],
            ]
        }
    ]
}