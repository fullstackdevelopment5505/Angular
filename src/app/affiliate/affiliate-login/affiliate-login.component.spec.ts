import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateLoginComponent } from './affiliate-login.component';

describe('AffiliateLoginComponent', () => {
  let component: AffiliateLoginComponent;
  let fixture: ComponentFixture<AffiliateLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
