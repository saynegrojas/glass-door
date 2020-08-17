import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerBrandingComponent } from './employer-branding.component';

describe('EmployerBrandingComponent', () => {
  let component: EmployerBrandingComponent;
  let fixture: ComponentFixture<EmployerBrandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerBrandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerBrandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
