import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitesListComponent } from './facilites-list.component';

describe('FacilitesListComponent', () => {
  let component: FacilitesListComponent;
  let fixture: ComponentFixture<FacilitesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
