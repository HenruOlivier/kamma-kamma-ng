import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsDialogComponent } from './ss-dialog.component';

describe('SsDialogComponent', () => {
  let component: SsDialogComponent;
  let fixture: ComponentFixture<SsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
