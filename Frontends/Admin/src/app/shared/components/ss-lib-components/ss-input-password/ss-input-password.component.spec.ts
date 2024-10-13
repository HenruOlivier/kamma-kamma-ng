import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsInputPasswordComponent } from './ss-input-password.component';

describe('SsInputPasswordComponent', () => {
  let component: SsInputPasswordComponent;
  let fixture: ComponentFixture<SsInputPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsInputPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsInputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
