import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsChunkUploaderComponent } from './ss-chunk-uploader.component';

describe('SsChunkUploaderComponent', () => {
  let component: SsChunkUploaderComponent;
  let fixture: ComponentFixture<SsChunkUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsChunkUploaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsChunkUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
