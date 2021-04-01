import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotChangePwdComponent } from './forgot-change-pwd.component';

describe('ForgotChangePwdComponent', () => {
  let component: ForgotChangePwdComponent;
  let fixture: ComponentFixture<ForgotChangePwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotChangePwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
