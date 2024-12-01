import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorsFormComponent } from './mentors-form.component';

describe('MentorsFormComponent', () => {
  let component: MentorsFormComponent;
  let fixture: ComponentFixture<MentorsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
