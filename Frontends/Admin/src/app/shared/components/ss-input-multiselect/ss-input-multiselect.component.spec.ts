import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsInputMultiselectComponent } from './ss-input-multiselect.component';

describe('SsInputMultiselectComponent', () => {
  let component: SsInputMultiselectComponent;
  let fixture: ComponentFixture<SsInputMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsInputMultiselectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsInputMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
