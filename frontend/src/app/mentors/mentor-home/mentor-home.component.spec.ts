import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorHomeComponent } from './mentor-home.component';

describe('MentorHomeComponent', () => {
  let component: MentorHomeComponent;
  let fixture: ComponentFixture<MentorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
