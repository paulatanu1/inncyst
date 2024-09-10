import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabMenuItemComponent } from './lab-menu-item.component';

describe('LabMenuItemComponent', () => {
  let component: LabMenuItemComponent;
  let fixture: ComponentFixture<LabMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabMenuItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
