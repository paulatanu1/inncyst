import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryJobManagementComponent } from './industry-job-management.component';

describe('IndustryJobManagementComponent', () => {
  let component: IndustryJobManagementComponent;
  let fixture: ComponentFixture<IndustryJobManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryJobManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryJobManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
