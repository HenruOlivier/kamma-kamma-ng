import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLocationComponent } from './shop-location.component';

describe('ShopLocationComponent', () => {
  let component: ShopLocationComponent;
  let fixture: ComponentFixture<ShopLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
