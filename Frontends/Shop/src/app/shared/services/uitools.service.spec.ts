import { TestBed } from '@angular/core/testing';

import { UitoolsService } from './uitools.service';

describe('UitoolsService', () => {
  let service: UitoolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UitoolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
