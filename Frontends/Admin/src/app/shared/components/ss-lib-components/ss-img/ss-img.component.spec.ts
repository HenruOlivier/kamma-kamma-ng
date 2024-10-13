import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsImgComponent } from './ss-img.component';

describe('SsImgComponent', () => {
  let component: SsImgComponent;
  let fixture: ComponentFixture<SsImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
