import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsInputCalendarComponent } from './ss-input-calendar.component';

describe('SsInputCalendarComponent', () => {
  let component: SsInputCalendarComponent;
  let fixture: ComponentFixture<SsInputCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsInputCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsInputCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
