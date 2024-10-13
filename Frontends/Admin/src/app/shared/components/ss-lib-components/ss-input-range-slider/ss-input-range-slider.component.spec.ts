import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsInputRangeSliderComponent } from './ss-input-range-slider.component';

describe('SsInputRangeSliderComponent', () => {
  let component: SsInputRangeSliderComponent;
  let fixture: ComponentFixture<SsInputRangeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsInputRangeSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsInputRangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
