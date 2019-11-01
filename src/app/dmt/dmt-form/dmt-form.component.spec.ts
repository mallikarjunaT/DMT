import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmtFormComponent } from './dmt-form.component';

describe('DmtFormComponent', () => {
  let component: DmtFormComponent;
  let fixture: ComponentFixture<DmtFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmtFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
