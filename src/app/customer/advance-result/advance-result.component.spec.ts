import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceResultComponent } from './advance-result.component';

describe('AdvanceResultComponent', () => {
  let component: AdvanceResultComponent;
  let fixture: ComponentFixture<AdvanceResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
