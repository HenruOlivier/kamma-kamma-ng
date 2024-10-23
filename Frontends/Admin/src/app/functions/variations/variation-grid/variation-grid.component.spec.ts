import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationGridComponent } from './variation-grid.component';

describe('VariationGridComponent', () => {
  let component: VariationGridComponent;
  let fixture: ComponentFixture<VariationGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariationGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
