import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsVirtualKeyboardComponent } from './ss-virtual-keyboard.component';

describe('SsVirtualKeyboardComponent', () => {
  let component: SsVirtualKeyboardComponent;
  let fixture: ComponentFixture<SsVirtualKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsVirtualKeyboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsVirtualKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
