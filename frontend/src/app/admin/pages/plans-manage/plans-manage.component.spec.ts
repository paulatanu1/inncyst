import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansManageComponent } from './plans-manage.component';

describe('PlansManageComponent', () => {
  let component: PlansManageComponent;
  let fixture: ComponentFixture<PlansManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
