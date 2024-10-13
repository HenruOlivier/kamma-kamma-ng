import { TestBed } from '@angular/core/testing';

import { SsDataGridService } from './ss-data-grid.service';

describe('SsDataGridService', () => {
  let service: SsDataGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SsDataGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
