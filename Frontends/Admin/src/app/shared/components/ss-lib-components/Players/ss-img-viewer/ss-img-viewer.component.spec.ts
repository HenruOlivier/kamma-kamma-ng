import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSImgViewerComponent } from './ss-img-viewer.component';

describe('SSImgViewerComponent', () => {
  let component: SSImgViewerComponent;
  let fixture: ComponentFixture<SSImgViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SSImgViewerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SSImgViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
