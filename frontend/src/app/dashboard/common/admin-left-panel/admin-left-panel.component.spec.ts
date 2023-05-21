import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeftPanelComponent } from './admin-left-panel.component';

describe('AdminLeftPanelComponent', () => {
  let component: AdminLeftPanelComponent;
  let fixture: ComponentFixture<AdminLeftPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLeftPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
