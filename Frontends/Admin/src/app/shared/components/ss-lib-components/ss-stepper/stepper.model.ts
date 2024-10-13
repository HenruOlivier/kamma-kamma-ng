import { Type } from "@angular/core";

export class StepperStep {
    public component: Type<any>;
    public data: any;
    public icon: string;
    public displayName: string;

    constructor({
        component,
        data = null,
        icon = 'bi bi-pencil-fill',
        displayName = 'Next',
    }: {
        component: Type<any>,
        data?: any,
        icon?: string,
        displayName?: string,
    }) {
        this.component = component;
        this.data = data;
        this.icon = icon;
        this.displayName = displayName;
    }
}
