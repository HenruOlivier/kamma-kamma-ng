import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryGridComponent } from './category-grid.component';

describe('CatagoryGridComponent', () => {
  let component: CatagoryGridComponent;
  let fixture: ComponentFixture<CatagoryGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatagoryGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatagoryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
