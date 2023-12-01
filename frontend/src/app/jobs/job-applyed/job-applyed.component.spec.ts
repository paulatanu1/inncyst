import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplyedComponent } from './job-applyed.component';

describe('JobApplyedComponent', () => {
  let component: JobApplyedComponent;
  let fixture: ComponentFixture<JobApplyedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplyedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplyedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
