import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryTopRightPanelComponent } from './industry-top-right-panel.component';

describe('IndustryTopRightPanelComponent', () => {
  let component: IndustryTopRightPanelComponent;
  let fixture: ComponentFixture<IndustryTopRightPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryTopRightPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryTopRightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
