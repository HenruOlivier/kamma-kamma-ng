import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsFormBuilderGenericHostContainerComponent } from './ss-form-builder-generic-host-container.component';

describe('SsFormBuilderGenericHostContainerComponent', () => {
  let component: SsFormBuilderGenericHostContainerComponent;
  let fixture: ComponentFixture<SsFormBuilderGenericHostContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsFormBuilderGenericHostContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsFormBuilderGenericHostContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
