import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPropertyDetailComponent } from './upload-property-detail.component';

describe('UploadPropertyDetailComponent', () => {
  let component: UploadPropertyDetailComponent;
  let fixture: ComponentFixture<UploadPropertyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPropertyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
