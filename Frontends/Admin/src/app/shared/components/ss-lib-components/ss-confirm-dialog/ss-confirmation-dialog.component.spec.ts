import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsConfirmDialogComponent } from './ss-confirm-dialog.component';

describe('SsConfirmDialogComponent', () => {
  let component: SsConfirmDialogComponent;
  let fixture: ComponentFixture<SsConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsConfirmDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
