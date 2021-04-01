import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedRecordsComponent } from './purchased-records.component';

describe('PurchasedRecordsComponent', () => {
  let component: PurchasedRecordsComponent;
  let fixture: ComponentFixture<PurchasedRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
