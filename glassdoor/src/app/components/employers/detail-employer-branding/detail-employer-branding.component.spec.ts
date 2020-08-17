import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEmployerBrandingComponent } from './detail-employer-branding.component';

describe('DetailEmployerBrandingComponent', () => {
  let component: DetailEmployerBrandingComponent;
  let fixture: ComponentFixture<DetailEmployerBrandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEmployerBrandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEmployerBrandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
