import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceCustomerComponent } from './advance-customer.component';

describe('AdvanceCustomerComponent', () => {
  let component: AdvanceCustomerComponent;
  let fixture: ComponentFixture<AdvanceCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
