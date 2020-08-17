import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsnavComponent } from './jobsnav.component';

describe('JobsnavComponent', () => {
  let component: JobsnavComponent;
  let fixture: ComponentFixture<JobsnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
