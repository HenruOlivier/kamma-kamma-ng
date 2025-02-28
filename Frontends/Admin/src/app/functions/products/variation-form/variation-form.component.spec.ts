import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationFormComponent } from './variation-form.component';

describe('VariationFormComponent', () => {
  let component: VariationFormComponent;
  let fixture: ComponentFixture<VariationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
