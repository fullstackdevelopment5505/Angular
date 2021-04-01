import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPurchasedRecordsComponent } from './all-purchased-records.component';

describe('AllPurchasedRecordsComponent', () => {
  let component: AllPurchasedRecordsComponent;
  let fixture: ComponentFixture<AllPurchasedRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPurchasedRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPurchasedRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
