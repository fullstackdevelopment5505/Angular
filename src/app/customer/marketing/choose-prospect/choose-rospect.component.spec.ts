import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChooseProspectComponent } from './choose-prospect.component';


describe('smsProspectComponent', () => {
  let component: ChooseProspectComponent;
  let fixture: ComponentFixture<ChooseProspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseProspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
