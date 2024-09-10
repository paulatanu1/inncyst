import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPageHeaderComponent } from './lab-page-header.component';

describe('LabPageHeaderComponent', () => {
  let component: LabPageHeaderComponent;
  let fixture: ComponentFixture<LabPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabPageHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
