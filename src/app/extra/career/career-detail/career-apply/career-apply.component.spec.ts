import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerApplyComponent } from './career-apply.component';

describe('CareerApplyComponent', () => {
  let component: CareerApplyComponent;
  let fixture: ComponentFixture<CareerApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
