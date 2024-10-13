import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsInputTimeComponent } from './ss-input-time.component';

describe('SsInputTimeComponent', () => {
  let component: SsInputTimeComponent;
  let fixture: ComponentFixture<SsInputTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsInputTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsInputTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
