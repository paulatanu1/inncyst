import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabDashboardComponent } from './lab-dashboard.component';

describe('LabDashboardComponent', () => {
  let component: LabDashboardComponent;
  let fixture: ComponentFixture<LabDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
