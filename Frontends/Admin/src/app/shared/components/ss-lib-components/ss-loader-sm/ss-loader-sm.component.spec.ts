import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsLoaderSmComponent } from './ss-loader-sm.component';

describe('SsLoaderSmComponent', () => {
  let component: SsLoaderSmComponent;
  let fixture: ComponentFixture<SsLoaderSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsLoaderSmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsLoaderSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
