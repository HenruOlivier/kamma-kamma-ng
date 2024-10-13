import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsInputTextButtonComponent } from './ss-input-text-button.component';

describe('SsInputTextButtonComponent', () => {
  let component: SsInputTextButtonComponent;
  let fixture: ComponentFixture<SsInputTextButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsInputTextButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsInputTextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
