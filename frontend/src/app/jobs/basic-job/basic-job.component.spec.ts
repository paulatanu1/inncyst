import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicJobComponent } from './basic-job.component';

describe('BasicJobComponent', () => {
  let component: BasicJobComponent;
  let fixture: ComponentFixture<BasicJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
