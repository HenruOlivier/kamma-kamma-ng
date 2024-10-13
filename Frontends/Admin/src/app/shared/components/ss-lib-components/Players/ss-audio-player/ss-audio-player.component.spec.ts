import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSAudioPlayerComponent } from './ss-audio-player.component';

describe('SSAudioPlayerComponent', () => {
  let component: SSAudioPlayerComponent;
  let fixture: ComponentFixture<SSAudioPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SSAudioPlayerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SSAudioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
