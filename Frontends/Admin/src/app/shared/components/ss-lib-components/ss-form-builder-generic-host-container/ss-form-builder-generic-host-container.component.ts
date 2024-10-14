import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnInit, Optional, Output, Self, Type, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CustomFormField } from '../ss-form-builder2/custom-form-field.model';
import { Observable } from 'rxjs';
// import { CustomFormFieldManager } from '../ss-form-builder/custom-form-field-manager';

@Component({
  selector: 'ss-form-builder-generic-host-container',
  templateUrl: './ss-form-builder-generic-host-container.component.html',
  styleUrls: ['./ss-form-builder-generic-host-container.component.scss']
})
export class SSFormBuilderGenericHostContainerComponent implements OnInit {

  @Input() component!: Type<any>;

  @Input() args: any;

  @Input() loading: Observable<boolean>;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  componentRef!: ComponentRef<any>;

  value: any;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private componentFactoryResolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    this.componentRef = this.container.createComponent(factory);

    const instance = (this.componentRef.instance as CustomFormField);

    if (instance) {
      instance.writeValue(this.value);
      instance.registerOnChange((newValue: any) => {
        this.value = newValue;
        this.valueChange.emit(newValue);
      });
    }else{
      console.error('Custom form field does not implement CustomFormField interface correctly')
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.valueChange.subscribe(fn);
    this.valueChange.emit(this.value);
  }

  registerOnTouched(): void { }

  isValid(): boolean | null {
    return this.ngControl.valid;
  }
}
