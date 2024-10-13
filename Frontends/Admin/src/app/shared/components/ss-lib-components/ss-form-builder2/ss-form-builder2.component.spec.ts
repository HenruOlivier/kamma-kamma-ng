import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsFormBuilder2Component } from './ss-form-builder2.component';

describe('SsFormBuilder2Component', () => {
  let component: SsFormBuilder2Component;
  let fixture: ComponentFixture<SsFormBuilder2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsFormBuilder2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsFormBuilder2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
