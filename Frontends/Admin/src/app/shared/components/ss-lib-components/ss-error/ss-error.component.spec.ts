import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsErrorComponent } from './ss-error.component';

describe('SsErrorComponent', () => {
  let component: SsErrorComponent;
  let fixture: ComponentFixture<SsErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
