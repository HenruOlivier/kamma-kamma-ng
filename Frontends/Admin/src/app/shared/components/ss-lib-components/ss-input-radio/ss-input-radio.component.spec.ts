import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsInputRadioComponent } from './ss-input-radio.component';

describe('SsInputRadioComponent', () => {
  let component: SsInputRadioComponent;
  let fixture: ComponentFixture<SsInputRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsInputRadioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsInputRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
