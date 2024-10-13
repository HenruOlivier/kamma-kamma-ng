export enum SSVirtualKeyClasses {
    SmallKey = 'vk-sm',
    MediumKey = 'vk-md',
    LargeKey = 'vk-lg',
    XLargeKey = 'vk-xl',
    AccentKey = 'vk-accent'
}

export enum SSVirtualKeyAction {
    Default = 'default',
    StateTransitionTrigger = 'state-transition-trigger',
    Enter = 'enter',
    Backspace = 'backspace',
    Spacebar = 'spacebar',
    CloseKeyboard = 'close-keyboard'
}

export class SSVirtualKey {
    public key: string;
    public keyClass: SSVirtualKeyClasses | string[];
    public keyAction: SSVirtualKeyAction;
    public transitionState: string;
    public innerHTML: string

    constructor({
        key = '?',
        keyClass = SSVirtualKeyClasses.SmallKey,
        keyAction = SSVirtualKeyAction.Default,
        transitionState = '',
        innerHTML = ''

    }: Partial<SSVirtualKey> = {}) {
        this.key = key,
        this.keyClass = keyClass,
        this.keyAction = keyAction,
        this.transitionState = transitionState,
        this.innerHTML = innerHTML
    }
}