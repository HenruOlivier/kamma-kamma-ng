import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsSkeletonLoaderComponent } from './ss-skeleton-loader.component';

describe('SsSkeletonLoaderComponent', () => {
  let component: SsSkeletonLoaderComponent;
  let fixture: ComponentFixture<SsSkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsSkeletonLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
