import { TestBed } from '@angular/core/testing';

import { SSFormController } from './ss-form-controller.service';

describe('SsFormBuilder2Service', () => {
  let service: SSFormController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SSFormController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
