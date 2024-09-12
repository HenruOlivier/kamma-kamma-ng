import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseGridComponent } from './warehouse-grid.component';

describe('WarehouseGridComponent', () => {
  let component: WarehouseGridComponent;
  let fixture: ComponentFixture<WarehouseGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarehouseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
