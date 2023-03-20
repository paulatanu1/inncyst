import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetJobComponent } from './get-job.component';

describe('GetJobComponent', () => {
  let component: GetJobComponent;
  let fixture: ComponentFixture<GetJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
