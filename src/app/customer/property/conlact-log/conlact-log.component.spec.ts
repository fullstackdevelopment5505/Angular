import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConlactLogComponent } from './conlact-log.component';

describe('ConlactLogComponent', () => {
  let component: ConlactLogComponent;
  let fixture: ComponentFixture<ConlactLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConlactLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConlactLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
