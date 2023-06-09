import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadResumeStepComponent } from './upload-resume-step.component';

describe('UploadResumeStepComponent', () => {
  let component: UploadResumeStepComponent;
  let fixture: ComponentFixture<UploadResumeStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadResumeStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadResumeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
