import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotLeadsComponent } from './hot-leads.component';

describe('HotLeadsComponent', () => {
  let component: HotLeadsComponent;
  let fixture: ComponentFixture<HotLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
