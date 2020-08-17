import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerNavComponent } from './employer-nav.component';

describe('EmployerNavComponent', () => {
  let component: EmployerNavComponent;
  let fixture: ComponentFixture<EmployerNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
