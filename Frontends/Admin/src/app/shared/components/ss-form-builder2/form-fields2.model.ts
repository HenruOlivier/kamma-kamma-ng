import { Type } from "@angular/core";
import { Observable } from "rxjs";

export enum FormFieldTypes {
    Text = 'text',
    TextArea = 'textarea',
    Number = 'number',
    Password = 'password',
    Email = 'email',
    Date = 'date',
    Time = 'time',
    Select = 'select',
    MultiSelect = 'multi-select',
    Radio = 'radio',
    Range = 'range',
    Checkbox = 'checkbox',
    Custom = 'custom'
}

export interface BaseFormField {
    type: FormFieldTypes;
    name: string;
    label: string;
    required: boolean;
    subtext?: string;
}

export interface TextField extends BaseFormField {
    type: FormFieldTypes.Text;
}

export interface TextAreaField extends BaseFormField {
    type: FormFieldTypes.TextArea;
}

export interface NumberField extends BaseFormField {
    type: FormFieldTypes.Number;
    min?: number;
    max?: number;
}

export interface PasswordField extends BaseFormField {
    type: FormFieldTypes.Password;
}

export interface EmailField extends BaseFormField {
    type: FormFieldTypes.Email;
}

export interface DateField extends BaseFormField {
    type: FormFieldTypes.Date;
}

export interface TimeField extends BaseFormField {
    type: FormFieldTypes.Time;
}

export interface SelectField extends BaseFormField {
    type: FormFieldTypes.Select;
    dataset?: any[] | Promise<any[]> | Observable<any[]> | AsyncData | any;
    headerField?: string;
    subFields?: string[];
    imageField?: string;
    roundImage?: boolean;
    returnObject?: boolean;
    searchEnabled?: boolean;
    returnField?: string;
}

export interface MultiSelectField extends BaseFormField {
    type: FormFieldTypes.MultiSelect;
    dataset?: any[] | Promise<any> | Observable<any> | AsyncData | any;
    headerField?: string;
    subFields?: string[];
    imageField?: string;
    roundImage?: boolean;
    returnObject?: boolean;
    searchEnabled?: boolean;
    returnField?: string;
    max?: number;
}

export interface RadioField extends BaseFormField {
    type: FormFieldTypes.Radio;
    radioOptions?: any;
}

export interface RangeField extends BaseFormField {
    type: FormFieldTypes.Range;
    min?: number;
    max?: number;
    step?: number;
}

export interface CheckboxField extends BaseFormField {
    type: FormFieldTypes.Checkbox;
    min?: number;
    max?: number;
    step?: number;
}

export interface CustomField extends BaseFormField {
    type: FormFieldTypes.Custom;
    component: Type<any>;
    args?: any;
}

export interface AsyncData {
    service: Type<any>;
    method: string;
    args?: any[];
}

export type FormFieldDefinition = TextField | TextAreaField | NumberField | PasswordField | EmailField | DateField | TimeField | SelectField | MultiSelectField | RadioField | RangeField | CheckboxField | CustomField;