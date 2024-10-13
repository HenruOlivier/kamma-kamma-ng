import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsDataGridComponent } from './ss-data-grid.component';

describe('SsDataGridComponent', () => {
  let component: SsDataGridComponent;
  let fixture: ComponentFixture<SsDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsDataGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
