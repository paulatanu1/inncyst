import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryLeftPanelComponent } from './industry-left-panel.component';

describe('IndustryLeftPanelComponent', () => {
  let component: IndustryLeftPanelComponent;
  let fixture: ComponentFixture<IndustryLeftPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryLeftPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryLeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
