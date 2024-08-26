import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessMapComponent } from './process-map.component';

describe('ProcessMapComponent', () => {
  let component: ProcessMapComponent;
  let fixture: ComponentFixture<ProcessMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
