import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatWeNeedComponent } from './what-we-need.component';

describe('WhatWeNeedComponent', () => {
  let component: WhatWeNeedComponent;
  let fixture: ComponentFixture<WhatWeNeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatWeNeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhatWeNeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
