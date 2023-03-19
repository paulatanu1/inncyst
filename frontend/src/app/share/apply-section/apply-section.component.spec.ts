import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplySectionComponent } from './apply-section.component';

describe('ApplySectionComponent', () => {
  let component: ApplySectionComponent;
  let fixture: ComponentFixture<ApplySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplySectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
