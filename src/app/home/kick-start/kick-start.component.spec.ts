import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KickStartComponent } from './kick-start.component';

describe('KickStartComponent', () => {
  let component: KickStartComponent;
  let fixture: ComponentFixture<KickStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KickStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KickStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
