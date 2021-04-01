import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlyInterestedComponent } from './highly-interested.component';

describe('HighlyInterestedComponent', () => {
  let component: HighlyInterestedComponent;
  let fixture: ComponentFixture<HighlyInterestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlyInterestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlyInterestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
