import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredSkillStepComponent } from './required-skill-step.component';

describe('RequiredSkillStepComponent', () => {
  let component: RequiredSkillStepComponent;
  let fixture: ComponentFixture<RequiredSkillStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredSkillStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredSkillStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
