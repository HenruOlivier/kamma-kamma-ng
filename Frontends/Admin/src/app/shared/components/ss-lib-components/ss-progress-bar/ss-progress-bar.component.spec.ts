import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsProgressBarComponent } from './ss-progress-bar.component';

describe('SsProgressBarComponent', () => {
  let component: SsProgressBarComponent;
  let fixture: ComponentFixture<SsProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsProgressBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SsProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
