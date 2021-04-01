import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateSignupComponent } from './affiliate-signup.component';

describe('AffiliateSignupComponent', () => {
  let component: AffiliateSignupComponent;
  let fixture: ComponentFixture<AffiliateSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
