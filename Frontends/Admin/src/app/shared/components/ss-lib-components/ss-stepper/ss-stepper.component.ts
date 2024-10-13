import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StepperStep } from './stepper.model';
import { SSStepController } from './stepper-controller.service';

@Component({
  selector: 'ss-stepper',
  templateUrl: './ss-stepper.component.html',
  styleUrls: ['./ss-stepper.component.scss']
})
export class SSStepperComponent {

  @ViewChild('stepContent', { read: ViewContainerRef }) stepContentPlaceholder: ViewContainerRef;

  steps$: Observable<StepperStep[]>;
  currentStepIndex: number;

  private componentRef: any;

  private stepsSubscription: Subscription;

  private viewIntialized:boolean = false;

  constructor(public stepController: SSStepController, private componentFactoryResolver: ComponentFactoryResolver) {
    this.steps$ = this.stepController.steps$;
  }

  ngOnInit() {
    this.stepsSubscription = this.stepController.getCurrentStepIndex().subscribe(index => {
      this.currentStepIndex = index;
      if(this.viewIntialized){
        setTimeout(()=>{
          this.loadStepComponent(this.currentStepIndex);
        },1)
      }
    });
  }

  ngAfterViewInit() {
    this.loadStepComponent(this.currentStepIndex);
  }

  private loadStepComponent(index: number) {
    if (this.stepController.getStepsLength() > 0) {
      this.stepContentPlaceholder.clear();

      this.stepController.steps$.subscribe(steps => {
        if (steps[index]) {
          const stepComponent = steps[index].component;
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(stepComponent);
          this.componentRef = this.stepContentPlaceholder.createComponent(componentFactory);
        }
      });
      this.viewIntialized = true;
    }
  }

  isStepActive(index: number): boolean {
    return this.currentStepIndex === index;
  }

  isLastStep(index: number) {
    if (this.stepController.getStepsLength() - 1 === index) {
      return true;
    } else {
      return false;
    }
  }

  getStateClass(i: number): string {
    if (i < this.currentStepIndex) return 'complete';
    if (i === this.currentStepIndex) return 'active';
    return 'pending';
  }

  onNext() {
    this.stepController.next();
  }

  onBack() {
    this.stepController.back();
  }

  ngOnDestroy() {
    if (this.stepsSubscription) {
      this.stepsSubscription.unsubscribe();
    }
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    this.stepController.clearStepper();
  }
}