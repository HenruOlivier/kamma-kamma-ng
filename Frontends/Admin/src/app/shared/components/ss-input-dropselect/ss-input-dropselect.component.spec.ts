import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsInputDropselectComponent } from './ss-input-dropselect.component';

describe('SsInputDropselectComponent', () => {
  let component: SsInputDropselectComponent;
  let fixture: ComponentFixture<SsInputDropselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsInputDropselectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsInputDropselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
