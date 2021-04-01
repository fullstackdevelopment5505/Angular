import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KickDetailComponent } from './kick-detail.component';

describe('KickDetailComponent', () => {
  let component: KickDetailComponent;
  let fixture: ComponentFixture<KickDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KickDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KickDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
