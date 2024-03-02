import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListProfileComponent } from './job-list-profile.component';

describe('JobListProfileComponent', () => {
  let component: JobListProfileComponent;
  let fixture: ComponentFixture<JobListProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobListProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobListProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
