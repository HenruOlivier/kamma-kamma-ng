import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsInputSearchComponent } from './ss-input-search.component';

describe('SsInputSearchComponent', () => {
  let component: SsInputSearchComponent;
  let fixture: ComponentFixture<SsInputSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsInputSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsInputSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
