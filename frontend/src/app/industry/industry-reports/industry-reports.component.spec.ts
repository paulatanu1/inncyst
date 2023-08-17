import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryReportsComponent } from './industry-reports.component';

describe('IndustryReportsComponent', () => {
  let component: IndustryReportsComponent;
  let fixture: ComponentFixture<IndustryReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
