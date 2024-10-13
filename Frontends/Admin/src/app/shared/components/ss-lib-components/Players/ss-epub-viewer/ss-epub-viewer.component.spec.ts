import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSEpubViewerComponent } from './ss-epub-viewer.component';

describe('SSEpubViewerComponent', () => {
  let component: SSEpubViewerComponent;
  let fixture: ComponentFixture<SSEpubViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SSEpubViewerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SSEpubViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
