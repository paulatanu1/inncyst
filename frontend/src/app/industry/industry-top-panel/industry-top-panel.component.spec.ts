import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryTopPanelComponent } from './industry-top-panel.component';

describe('IndustryTopPanelComponent', () => {
  let component: IndustryTopPanelComponent;
  let fixture: ComponentFixture<IndustryTopPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryTopPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryTopPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
