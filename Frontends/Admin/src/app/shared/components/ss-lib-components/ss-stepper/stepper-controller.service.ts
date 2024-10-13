import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StepperStep } from './stepper.model';

@Injectable({
  providedIn: 'root'
})
export class SSStepController {

  private currentStepIndex = new BehaviorSubject<number>(0);

  private stepsSource = new BehaviorSubject<StepperStep[]>([]);
  steps$ = this.stepsSource.asObservable();

  private stepResults = Array<{ stepName: string, value: any }>();

  private _canNext: boolean = false;
  private _canBack: boolean = false;

  get canNext(): boolean {
    return this._canNext;
  }

  get canBack(): boolean {
    return this._canBack;
  }

  set canNext(value: boolean) {
    this._canNext = value;
  }

  set canBack(value: boolean) {
    this._canBack = value;
  }

  constructor() { }

  setSteps(steps: StepperStep[]) {
    this.stepsSource.next(steps);
  }

  getCurrentStepIndex() {
    return this.currentStepIndex.asObservable();
  }

  setCurrentStepIndex(index: number) {
    this.currentStepIndex.next(index);
  }

  isLastStep(): boolean {
    if (this.currentStepIndex.value === this.stepsSource.value.length - 1) {
      return true;
    } else {
      return false;
    }
  }

  isFirstStep(): boolean {
    if (this.currentStepIndex.value === 0) {
      return true;
    } else {
      return false;
    }
  }

  getStepsLength(): number {
    return this.stepsSource.value.length;
  }

  next() {
    if (!this.isLastStep()) {
      this.currentStepIndex.next(this.currentStepIndex.value + 1);
      this.canNext = false;
    }

  }

  back() {
    if (!this.isFirstStep()) {
      this.currentStepIndex.next(this.currentStepIndex.value - 1);
      this.canBack = false;
    }
  }

  getStepResult(stepName: string) {
    const result = this.stepResults.find(result => result.stepName === stepName);
    return result ? result.value : null;
  }

  getResults() {
    // Return a shallow copy of the stepResults array to avoid mutation
    return [...this.stepResults];
  }

  setStepResult(stepName: string, value: any) {
    const index = this.stepResults.findIndex(result => result.stepName === stepName);
    if (index !== -1) {
      this.stepResults[index].value = value;
    } else {
      this.stepResults.push({ stepName, value: value });
    }
  }

  clearStepper() {
    this.stepsSource.next([]);
    this.currentStepIndex.next(0);
    this.canBack = false;
    this.canNext = false;
    this.stepResults = [];
  }
}