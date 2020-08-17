import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployerBrandingComponent } from './create-employer-branding.component';

describe('CreateEmployerBrandingComponent', () => {
  let component: CreateEmployerBrandingComponent;
  let fixture: ComponentFixture<CreateEmployerBrandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEmployerBrandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmployerBrandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
