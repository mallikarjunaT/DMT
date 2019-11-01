import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilepostpaidComponent } from './mobilepostpaid.component';

describe('MobilepostpaidComponent', () => {
  let component: MobilepostpaidComponent;
  let fixture: ComponentFixture<MobilepostpaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilepostpaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilepostpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
