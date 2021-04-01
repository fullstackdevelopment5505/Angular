import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProspectComponent } from './dashboard-prospect.component';

describe('DashboardProspectComponent', () => {
  let component: DashboardProspectComponent;
  let fixture: ComponentFixture<DashboardProspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
