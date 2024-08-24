import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPollLoginComponent } from './lab-poll-login.component';

describe('LabPollLoginComponent', () => {
  let component: LabPollLoginComponent;
  let fixture: ComponentFixture<LabPollLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabPollLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabPollLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
