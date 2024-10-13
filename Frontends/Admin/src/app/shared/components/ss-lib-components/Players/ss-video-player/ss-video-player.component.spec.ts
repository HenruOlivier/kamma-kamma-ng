import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSVideoPlayerComponent } from './ss-video-player.component';

describe('SSVideoPlayerComponent', () => {
  let component: SSVideoPlayerComponent;
  let fixture: ComponentFixture<SSVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SSVideoPlayerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SSVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
