import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUploadedRecordsComponent } from './all-uploaded-records.component';

describe('AllUploadedRecordsComponent', () => {
  let component: AllUploadedRecordsComponent;
  let fixture: ComponentFixture<AllUploadedRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUploadedRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUploadedRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
