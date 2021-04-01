import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProspectWarmComponent } from './dashboard-prospect.component';

describe('DashboardProspectWarmComponent', () => {
  let component: DashboardProspectWarmComponent;
  let fixture: ComponentFixture<DashboardProspectWarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProspectWarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProspectWarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
