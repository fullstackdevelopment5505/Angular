import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipCustomerComponent } from './membership-customer.component';

describe('MembershipCustomerComponent', () => {
  let component: MembershipCustomerComponent;
  let fixture: ComponentFixture<MembershipCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
