import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsStepperComponent } from './ss-stepper.component';

describe('SsStepperComponent', () => {
  let component: SsStepperComponent;
  let fixture: ComponentFixture<SsStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
