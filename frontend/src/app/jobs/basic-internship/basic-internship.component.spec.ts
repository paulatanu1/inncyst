import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInternshipComponent } from './basic-internship.component';

describe('BasicInternshipComponent', () => {
  let component: BasicInternshipComponent;
  let fixture: ComponentFixture<BasicInternshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicInternshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicInternshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
