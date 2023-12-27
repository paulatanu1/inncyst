import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsManagementComponent } from './jobs-management.component';

describe('JobsManagementComponent', () => {
  let component: JobsManagementComponent;
  let fixture: ComponentFixture<JobsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
