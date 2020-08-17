import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsprofileComponent } from './jobsprofile.component';

describe('JobsprofileComponent', () => {
  let component: JobsprofileComponent;
  let fixture: ComponentFixture<JobsprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
