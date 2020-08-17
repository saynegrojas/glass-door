import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerBrandingListComponent } from './employer-branding-list.component';

describe('EmployerBrandingListComponent', () => {
  let component: EmployerBrandingListComponent;
  let fixture: ComponentFixture<EmployerBrandingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerBrandingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerBrandingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
