import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionsPageComponent } from './functions-page.component';

describe('FunctionsPageComponent', () => {
  let component: FunctionsPageComponent;
  let fixture: ComponentFixture<FunctionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunctionsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
