import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitesAddComponent } from './facilites-add.component';

describe('FacilitesAddComponent', () => {
  let component: FacilitesAddComponent;
  let fixture: ComponentFixture<FacilitesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
