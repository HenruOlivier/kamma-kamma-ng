import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardDraggerComponent } from './keyboard-dragger.component';

describe('KeyboardDraggerComponent', () => {
  let component: KeyboardDraggerComponent;
  let fixture: ComponentFixture<KeyboardDraggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyboardDraggerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyboardDraggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
