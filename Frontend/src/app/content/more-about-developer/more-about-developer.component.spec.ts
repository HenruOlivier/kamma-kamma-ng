import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreAboutDeveloperComponent } from './more-about-developer.component';

describe('MoreAboutDeveloperComponent', () => {
  let component: MoreAboutDeveloperComponent;
  let fixture: ComponentFixture<MoreAboutDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreAboutDeveloperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoreAboutDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
