import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetGoingComponent } from './get-going.component';

describe('GetGoingComponent', () => {
  let component: GetGoingComponent;
  let fixture: ComponentFixture<GetGoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetGoingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetGoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
