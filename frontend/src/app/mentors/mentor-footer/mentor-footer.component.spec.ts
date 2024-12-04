import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorFooterComponent } from './mentor-footer.component';

describe('MentorFooterComponent', () => {
  let component: MentorFooterComponent;
  let fixture: ComponentFixture<MentorFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
