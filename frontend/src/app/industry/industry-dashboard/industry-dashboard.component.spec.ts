import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryDashboardComponent } from './industry-dashboard.component';

describe('IndustryDashboardComponent', () => {
  let component: IndustryDashboardComponent;
  let fixture: ComponentFixture<IndustryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
