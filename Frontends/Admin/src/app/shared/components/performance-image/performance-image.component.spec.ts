import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceImageComponent } from './performance-image.component';

describe('PerformanceImageComponent', () => {
  let component: PerformanceImageComponent;
  let fixture: ComponentFixture<PerformanceImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceImageComponent]
    });
    fixture = TestBed.createComponent(PerformanceImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
