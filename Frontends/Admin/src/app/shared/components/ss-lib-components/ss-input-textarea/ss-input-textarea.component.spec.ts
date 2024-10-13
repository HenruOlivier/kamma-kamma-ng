import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsInputTextareaComponent } from './ss-input-textarea.component';

describe('SsInputTextareaComponent', () => {
  let component: SsInputTextareaComponent;
  let fixture: ComponentFixture<SsInputTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsInputTextareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsInputTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
