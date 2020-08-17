import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployerBrandingComponent } from './edit-employer-branding.component';

describe('EditEmployerBrandingComponent', () => {
  let component: EditEmployerBrandingComponent;
  let fixture: ComponentFixture<EditEmployerBrandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmployerBrandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmployerBrandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
