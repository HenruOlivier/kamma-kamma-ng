import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMoreCardComponent } from './show-more-card.component';

describe('ShowMoreCardComponent', () => {
  let component: ShowMoreCardComponent;
  let fixture: ComponentFixture<ShowMoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowMoreCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowMoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
