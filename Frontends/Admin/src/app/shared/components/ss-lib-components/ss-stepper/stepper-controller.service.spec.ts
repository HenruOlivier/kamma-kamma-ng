import { TestBed } from '@angular/core/testing';

import { StepperControllerService } from './stepper-controller.service';

describe('StepperControllerService', () => {
  let service: StepperControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepperControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
