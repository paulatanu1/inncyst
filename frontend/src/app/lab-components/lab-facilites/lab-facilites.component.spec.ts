import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabFacilitesComponent } from './lab-facilites.component';

describe('LabFacilitesComponent', () => {
  let component: LabFacilitesComponent;
  let fixture: ComponentFixture<LabFacilitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabFacilitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabFacilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
