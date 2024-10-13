import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSPdfViewerComponent } from './ss-pdf-viewer.component';

describe('SSPdfViewerComponent', () => {
  let component: SSPdfViewerComponent;
  let fixture: ComponentFixture<SSPdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SSPdfViewerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SSPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
