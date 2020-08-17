import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatejobsComponent } from './createjobs.component';

describe('CreatejobsComponent', () => {
  let component: CreatejobsComponent;
  let fixture: ComponentFixture<CreatejobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatejobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatejobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
