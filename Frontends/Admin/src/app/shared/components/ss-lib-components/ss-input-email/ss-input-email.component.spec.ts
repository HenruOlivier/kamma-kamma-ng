import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsInputEmailComponent } from './ss-input-email.component';

describe('SsInputEmailComponent', () => {
  let component: SsInputEmailComponent;
  let fixture: ComponentFixture<SsInputEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsInputEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsInputEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
