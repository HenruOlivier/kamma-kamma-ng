import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsChipListComponent } from './ss-chip-list.component';

describe('SsChipListComponent', () => {
  let component: SsChipListComponent;
  let fixture: ComponentFixture<SsChipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsChipListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
