import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsdetailsComponent } from './jobsdetails.component';

describe('JobsdetailsComponent', () => {
  let component: JobsdetailsComponent;
  let fixture: ComponentFixture<JobsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
