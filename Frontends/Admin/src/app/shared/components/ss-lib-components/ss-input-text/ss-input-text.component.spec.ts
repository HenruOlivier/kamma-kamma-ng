import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsInputTextComponent } from './ss-input-text.component';

describe('SsInputTextComponent', () => {
  let component: SsInputTextComponent;
  let fixture: ComponentFixture<SsInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsInputTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
