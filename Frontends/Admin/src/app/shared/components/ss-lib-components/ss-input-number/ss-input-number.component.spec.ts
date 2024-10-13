import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsInputNumberComponent } from './ss-input-number.component';

describe('SsInputNumberComponent', () => {
  let component: SsInputNumberComponent;
  let fixture: ComponentFixture<SsInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsInputNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
