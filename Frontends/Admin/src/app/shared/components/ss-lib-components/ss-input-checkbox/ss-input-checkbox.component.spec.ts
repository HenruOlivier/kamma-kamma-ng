import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsInputCheckboxComponent } from './ss-input-checkbox.component';

describe('SsInputCheckboxComponent', () => {
  let component: SsInputCheckboxComponent;
  let fixture: ComponentFixture<SsInputCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsInputCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsInputCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
