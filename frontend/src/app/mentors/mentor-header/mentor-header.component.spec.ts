import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorHeaderComponent } from './mentor-header.component';

describe('MentorHeaderComponent', () => {
  let component: MentorHeaderComponent;
  let fixture: ComponentFixture<MentorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
